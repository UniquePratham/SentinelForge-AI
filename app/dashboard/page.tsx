'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Shield,
  Upload,
  Download,
  LogOut,
  User,
  Command,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AgentWindow } from '@/components/agent-window';
import { CommandPalette } from '@/components/command-palette';
import { PromptSelectionModal } from '@/components/prompt-selection-modal';
import { isAuthenticated, getCurrentUser, logoutUser } from '@/lib/auth';
import { dataAgentAPI, intentAgentAPI, PollingManager } from '@/lib/api-client';
import { analyzeWithHeuristics, calculateThreatScore, getSeverityCounts } from '@/lib/analysis-heuristics';
import { exportToJSON, exportToCSV, downloadFile } from '@/lib/export';
import type { AgentWindowData, ReportData } from '@/lib/types';
import { toast } from 'sonner';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dataAgentData, setDataAgentData] = useState<AgentWindowData>({
    id: 'data-agent',
    title: 'Data Agent',
    status: 'idle',
    provenance: 'DataAgent',
  });

  const [intentAgentData, setIntentAgentData] = useState<AgentWindowData>({
    id: 'intent-agent',
    title: 'Intent Agent',
    status: 'idle',
    provenance: 'IntentAgent',
  });

  const [analysisAgentData, setAnalysisAgentData] = useState<AgentWindowData>({
    id: 'analysis-agent',
    title: 'Analysis Agent',
    status: 'idle',
    provenance: 'AnalysisAgent',
  });

  const [reportAgentData, setReportAgentData] = useState<AgentWindowData>({
    id: 'report-agent',
    title: 'Report Agent',
    status: 'idle',
    provenance: 'ReportAgent',
  });

  const [mainAgentData, setMainAgentData] = useState<AgentWindowData>({
    id: 'main-agent',
    title: 'Main Agent - Combined Analysis',
    status: 'idle',
    provenance: 'MainAgent',
  });

  // State for prompt selection modal
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [pendingDataSummary, setPendingDataSummary] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    setUser(getCurrentUser());
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleFileUpload = async (file: File) => {
    try {
      toast.info(`Uploading ${file.name}...`);

      setDataAgentData((prev) => ({
        ...prev,
        status: 'processing',
        metadata: {
          filename: file.name,
          size_kb: file.size / 1024,
        },
      }));

      try {
        const uploadResponse = await dataAgentAPI.uploadFile(file);

        const pollingManager = new PollingManager();
        const result = await pollingManager.poll(
          async () => {
            const status = await dataAgentAPI.getLogStatus(uploadResponse.id);
            return { status: status.status, data: status };
          },
          (data) => {
            if (data) {
              setDataAgentData({
                id: uploadResponse.id,
                title: 'Data Agent',
                status: data.status,
                provenance: 'DataAgent',
                metadata: data.metadata,
                aiSummary: data.ai_summary,
                rawParsedData: data.raw_parsed_data,
                error: data.error,
                lastUpdated: new Date().toISOString(),
              });
            }
          }
        );

        if (result.ai_summary) {
          // Store the data summary and show prompt selection modal
          setPendingDataSummary(result.ai_summary.summary);
          setShowPromptModal(true);
          await handleAnalysis(result.raw_parsed_data);
        }

        toast.success('File processed successfully!');
      } catch (apiError: any) {
        // Backend unavailable or API call failed. Surface an error to the user and
        // set the data agent status to error. Do not use demo/mock data.
        console.error('Data Agent upload/polling error:', apiError);
        toast.error('Backend unavailable or upload failed. Please try again later.');

        setDataAgentData((prev) => ({
          ...prev,
          status: 'error',
          error: apiError?.message || String(apiError),
        }));
        return;
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
      setDataAgentData((prev) => ({
        ...prev,
        status: 'error',
        error: error.message,
      }));
    }
  };

  const handleIntentAnalysis = async (prompt: string) => {
    try {
      setIntentAgentData((prev) => ({ ...prev, status: 'processing' }));

      try {
        const result = await intentAgentAPI.analyzeIntent(prompt);

        setIntentAgentData({
          id: 'intent-agent',
          title: 'Intent Agent',
          status: 'completed',
          provenance: 'IntentAgent',
          intentAnalysis: result,
          lastUpdated: new Date().toISOString(),
        });
      } catch (apiError: any) {
        console.error('Intent analysis failed:', apiError);
        toast.error('Intent analysis failed. See console for details.');
        setIntentAgentData((prev) => ({
          ...prev,
          status: 'error',
          error: apiError?.message || String(apiError),
        }));
        return;
      }

      updateMainAgent();
    } catch (error: any) {
      toast.error(`Intent analysis failed: ${error.message}`);
      setIntentAgentData((prev) => ({
        ...prev,
        status: 'error',
        error: error.message,
      }));
    }
  };

  const handlePromptSelection = async (prompt: string, isAuto: boolean) => {
    try {
      if (isAuto) {
        toast.info('Processing with auto-generated prompt...');
      } else {
        toast.info('Processing with custom prompt...');
      }
      await handleIntentAnalysis(prompt);
    } catch (error: any) {
      toast.error(`Prompt processing failed: ${error.message}`);
    }
  };

  const handleAnalysis = async (data: any) => {
    // Analysis agent is not implemented yet. Mark as coming soon and avoid
    // running the heuristic analysis that previously pretended to work.
    setAnalysisAgentData({
      id: 'analysis-agent',
      title: 'Analysis Agent',
      status: 'coming-soon',
      provenance: 'AnalysisAgent',
      aiSummary: {
        summary: 'Analysis agent coming soon — offline/heuristic analysis is disabled in this build.',
      },
      lastUpdated: new Date().toISOString(),
    });

    // Also mark report and main agents as coming soon (they depend on analysis)
    setReportAgentData({
      id: 'report-agent',
      title: 'Report Agent',
      status: 'coming-soon',
      provenance: 'ReportAgent',
      aiSummary: { summary: 'Report agent coming soon — reporting pipeline will be added later.' },
      lastUpdated: new Date().toISOString(),
    });

    setMainAgentData({
      id: 'main-agent',
      title: 'Main Agent - Combined Analysis',
      status: 'coming-soon',
      provenance: 'MainAgent',
      aiSummary: { summary: 'Main agent coming soon — combined analysis will be available when analysis/report agents are implemented.' },
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateMainAgent = () => {
    const combinedSummary = `
## Combined Analysis Report

### Data Agent Summary
${dataAgentData.aiSummary?.summary || 'No data available'}

### Intent Analysis
${intentAgentData.intentAnalysis ? `Primary Intent: ${intentAgentData.intentAnalysis.analysis.intent.primary} (Confidence: ${(intentAgentData.intentAnalysis.analysis.intent.confidence * 100).toFixed(1)}%)` : 'No intent analysis available'}

### Security Analysis
${analysisAgentData.status === 'coming-soon' ? 'Analysis agent coming soon' : analysisAgentData.analysis?.summary || 'No analysis available'}

### Key Insights
${dataAgentData.aiSummary?.insights?.map((i) => `- ${i}`).join('\n') || ''}

### Recommendations
${analysisAgentData.status === 'coming-soon' ? '- Analysis agent coming soon' : analysisAgentData.analysis?.recommendations?.map((r) => `- ${r}`).join('\n') || ''}
    `.trim();

    setMainAgentData({
      id: 'main-agent',
      title: 'Main Agent - Combined Analysis',
      status: dataAgentData.status === 'completed' ? 'completed' : dataAgentData.status,
      provenance: 'MainAgent',
      aiSummary: {
        summary: combinedSummary,
      },
      lastUpdated: new Date().toISOString(),
    });

    if (dataAgentData.status === 'completed' && analysisAgentData.status === 'completed') {
      generateReport();
    }
  };

  const generateReport = () => {
    const severityCounts = analysisAgentData.analysis?.vulnerabilities
      ? getSeverityCounts(analysisAgentData.analysis.vulnerabilities)
      : { critical: 0, high: 0, medium: 0, low: 0 };

    const reportData: ReportData = {
      scan_id: dataAgentData.id,
      timestamp: new Date().toISOString(),
      sources: {
        dataAgent: {
          id: dataAgentData.id,
          status: dataAgentData.status,
          ai_summary: dataAgentData.aiSummary,
          raw_parsed_data: dataAgentData.rawParsedData,
        },
        intentAgent: intentAgentData.intentAnalysis,
        analysisAgent: analysisAgentData.analysis,
      },
      summary: {
        total_issues: analysisAgentData.analysis?.vulnerabilities.length || 0,
        critical_count: severityCounts.critical,
        high_count: severityCounts.high,
        medium_count: severityCounts.medium,
        low_count: severityCounts.low,
        threat_score: analysisAgentData.analysis
          ? calculateThreatScore(analysisAgentData.analysis.vulnerabilities)
          : 0,
      },
      recommendations: analysisAgentData.analysis?.recommendations || [],
    };

    setReportAgentData({
      id: 'report-agent',
      title: 'Report Agent',
      status: 'completed',
      provenance: 'ReportAgent',
      aiSummary: {
        summary: `Report generated with ${reportData.summary.total_issues} total issues. Threat Score: ${reportData.summary.threat_score.toFixed(1)}/10`,
        insights: [
          `${severityCounts.critical} critical issues require immediate attention`,
          `${severityCounts.high + severityCounts.medium} medium-to-high priority issues identified`,
          `Overall security posture: ${reportData.summary.threat_score < 5 ? 'Good' : reportData.summary.threat_score < 7 ? 'Moderate' : 'Critical'}`,
        ],
      },
      rawParsedData: reportData,
      lastUpdated: new Date().toISOString(),
    });
  };

  const handleExport = useCallback((format: 'json' | 'csv') => {
    if (reportAgentData.rawParsedData) {
      const content =
        format === 'json'
          ? exportToJSON(reportAgentData.rawParsedData as ReportData)
          : exportToCSV(reportAgentData.rawParsedData as ReportData);

      const mimeType =
        format === 'json' ? 'application/json' : 'text/csv';
      const filename = `sentinelforge-report-${Date.now()}.${format}`;

      downloadFile(content, filename, mimeType);
      toast.success(`Report exported as ${format.toUpperCase()}`);
    }
  }, [reportAgentData.rawParsedData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'u' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }
      if (e.key === 'e' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          if (reportAgentData.status === 'completed') {
            handleExport('json');
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleExport, reportAgentData.status]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1724] via-[#1a2332] to-[#0f1724]">
      <CommandPalette
        onUpload={() => fileInputRef.current?.click()}
        onExport={() => handleExport('json')}
      />
      <nav className="border-b border-cyan-500/20 backdrop-blur-sm">
        <div className="container-fluid px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-cyan-500" />
            <span className="text-xl font-bold text-white">SentinelForge</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              size="sm"
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>

            <Button
              onClick={() => handleExport('json')}
              size="sm"
              variant="outline"
              className="border-cyan-500/30"
              disabled={reportAgentData.status !== 'completed'}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400"
              title="Command Palette (Cmd+K)"
            >
              <Command className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className="bg-cyan-500 text-white text-xs">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-gray-400">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="h-[calc(100vh-64px)] p-4">
        <PanelGroup direction="vertical" className="h-full">
          <Panel defaultSize={60} minSize={40}>
            <PanelGroup direction="horizontal">
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full pr-2 pb-2">
                  <AgentWindow
                    data={dataAgentData}
                    onDownload={(format) =>
                      dataAgentData.rawParsedData &&
                      downloadFile(
                        JSON.stringify(dataAgentData.rawParsedData, null, 2),
                        `data-agent-${Date.now()}.json`,
                        'application/json'
                      )
                    }
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="w-2" />
              <Panel defaultSize={50} minSize={30}>
                <div className="h-full pl-2 pb-2">
                  <AgentWindow data={intentAgentData} />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="h-2" />

          <Panel defaultSize={40} minSize={30}>
            <PanelGroup direction="horizontal">
              <Panel defaultSize={33} minSize={25}>
                <div className="h-full pr-2 pt-2">
                  <AgentWindow data={analysisAgentData} />
                </div>
              </Panel>
              <PanelResizeHandle className="w-2" />
              <Panel defaultSize={33} minSize={25}>
                <div className="h-full px-1 pt-2">
                  <AgentWindow
                    data={reportAgentData}
                    onDownload={handleExport}
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="w-2" />
              <Panel defaultSize={34} minSize={25}>
                <div className="h-full pl-2 pt-2">
                  <AgentWindow data={mainAgentData} />
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </main>

      {/* Prompt Selection Modal */}
      <PromptSelectionModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        onSubmit={handlePromptSelection}
        autoPrompt={`Analysis this file with this data : ${pendingDataSummary}`}
        dataAgentResponse={pendingDataSummary}
      />
    </div>
  );
}
