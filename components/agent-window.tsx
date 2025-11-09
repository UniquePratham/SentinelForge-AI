'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Download,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Loader2,
  Activity,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import type { AgentWindowData, SeverityLevel } from '@/lib/types';
import { redactSensitiveData } from '@/lib/redaction';
import { toast } from 'sonner';

interface AgentWindowProps {
  data: AgentWindowData;
  onReRun?: () => void;
  onSummarize?: () => void;
  onDelete?: () => void;
  onDownload?: (format: 'json' | 'csv') => void;
}

const statusConfig = {
  idle: { color: 'bg-gray-500', icon: AlertCircle, label: 'Idle' },
  processing: { color: 'bg-blue-500', icon: Loader2, label: 'Processing' },
  completed: { color: 'bg-green-500', icon: CheckCircle, label: 'Completed' },
  error: { color: 'bg-red-500', icon: AlertCircle, label: 'Error' },
  // Placeholder state for agents that aren't implemented yet
  'coming-soon': { color: 'bg-violet-500', icon: AlertCircle, label: 'Coming soon' },
};

const severityColors: Record<SeverityLevel, string> = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

const ProvenanceBadge = ({ provenance }: { provenance: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative"
  >
    <Badge
      variant="secondary"
      className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
    >
      {provenance}
    </Badge>
    <div className="absolute inset-0 bg-cyan-500/20 rounded animate-pulse-glow opacity-30" />
  </motion.div>
);

const ThinkingAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative mb-4"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Activity className="w-8 h-8 text-cyan-500" />
      <motion.div
        className="absolute inset-0 bg-cyan-500/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>

    <div className="flex gap-1 mb-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-cyan-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>

    <motion.p
      className="text-sm text-gray-400"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Analyzing data...
    </motion.p>
  </motion.div>
);

const ShimmerCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    className={`relative overflow-hidden bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-shimmer" />
    <div className="relative">{children}</div>
  </motion.div>
);

export function AgentWindow({
  data,
  onReRun,
  onSummarize,
  onDelete,
  onDownload,
}: AgentWindowProps) {
  const [expanded, setExpanded] = useState(false);
  const statusInfo = statusConfig[data.status];
  const StatusIcon = statusInfo.icon;

  const handleCopy = async () => {
    try {
      const content = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full bg-[#0f1724] border-cyan-500/20 overflow-hidden relative">
        {/* Animated border for processing state */}
        <AnimatePresence>
          {data.status === 'processing' && (
            <motion.div
              className="absolute inset-0 border-2 border-cyan-500/50 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.01, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="flex items-center justify-between p-4 border-b border-cyan-500/20"
          layout
        >
          <div className="flex items-center gap-3">
            <motion.div
              className={`w-3 h-3 rounded-full ${statusInfo.color}`}
              animate={data.status === 'processing' ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h3 className="font-semibold text-white">{data.title}</h3>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="outline" className="text-xs">
                {statusInfo.label}
              </Badge>
            </motion.div>
            {data.provenance && (
              <ProvenanceBadge provenance={data.provenance} />
            )}
          </div>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {onReRun && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onReRun}
                disabled={data.status === 'processing'}
                className="hover:bg-cyan-500/10"
              >
                <RefreshCw className={`w-4 h-4 ${data.status === 'processing' ? 'animate-spin' : ''}`} />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="hover:bg-cyan-500/10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            {onDownload && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDownload('json')}
                className="hover:bg-cyan-500/10"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <AnimatePresence mode="wait">
            {data.status === 'coming-soon' && (
              <motion.div
                className="flex items-center justify-center py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-violet-500/5 border border-violet-500/20 rounded-lg p-6 text-center max-w-sm">
                  <p className="font-semibold text-violet-300">Coming soon</p>
                  <p className="text-sm text-gray-300 mt-2">This agent is not implemented in the current build.</p>
                </div>
              </motion.div>
            )}

            {data.status === 'processing' && (
              <ThinkingAnimation />
            )}

            {data.status === 'error' && data.error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-400">Error</p>
                    <p className="text-sm text-gray-300 mt-1">{data.error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {data.aiSummary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <h4 className="text-sm font-medium text-cyan-400">AI Summary</h4>
                <ShimmerCard className="p-4">
                  <p className="text-sm text-gray-300">{redactSensitiveData(data.aiSummary.summary)}</p>
                  {data.aiSummary.insights && data.aiSummary.insights.length > 0 && (
                    <motion.div
                      className="mt-3 space-y-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-xs font-medium text-gray-400">Key Insights:</p>
                      {data.aiSummary.insights.map((insight, i) => (
                        <motion.p
                          key={i}
                          className="text-xs text-gray-300 pl-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          • {redactSensitiveData(insight)}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </ShimmerCard>
              </motion.div>
            )}

            {data.aiSummary?.anomalies && data.aiSummary.anomalies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <h4 className="text-sm font-medium text-orange-400">Anomalies Detected</h4>
                <div className="space-y-2">
                  {data.aiSummary.anomalies.slice(0, 5).map((anomaly, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 hover:bg-orange-500/10 transition-colors"
                    >
                      {anomaly.severity && (
                        <Badge className={`${severityColors[anomaly.severity]} text-white text-xs mb-2`}>
                          {anomaly.severity}
                        </Badge>
                      )}
                      <p className="text-xs font-mono text-gray-300 mb-1">
                        {redactSensitiveData(anomaly.snippet)}
                      </p>
                      <p className="text-xs text-gray-400">{anomaly.explanation}</p>
                      {anomaly.line && (
                        <p className="text-xs text-gray-500 mt-1">Line {anomaly.line}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {data.intentAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h4 className="text-sm font-medium text-purple-400">Intent Analysis</h4>
                <ShimmerCard className="p-4 space-y-2">
                  <div>
                    <span className="text-xs text-gray-400">Primary Intent: </span>
                    <span className="text-sm text-gray-200">
                      {data.intentAnalysis.analysis.intent.primary}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Confidence: </span>
                    <span className="text-sm text-gray-200">
                      {(data.intentAnalysis.analysis.intent.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  {data.intentAnalysis.analysis.suggestedClarifications.length > 0 && (
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xs text-gray-400 mb-1">Suggested Clarifications:</p>
                      {data.intentAnalysis.analysis.suggestedClarifications.map((suggestion, i) => (
                        <motion.p
                          key={i}
                          className="text-xs text-gray-300 pl-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          • {suggestion}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </ShimmerCard>
              </motion.div>
            )}
          </AnimatePresence>

          {data.rawParsedData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="raw-data">
                  <AccordionTrigger className="text-sm text-gray-400">
                    Raw Data ({Array.isArray(data.rawParsedData) ? data.rawParsedData.length : 1} items)
                  </AccordionTrigger>
                  <AccordionContent>
                    <motion.pre
                      className="text-xs bg-black/30 p-3 rounded overflow-auto max-h-64"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {redactSensitiveData(JSON.stringify(data.rawParsedData, null, 2))}
                    </motion.pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          )}

          {data.lastUpdated && (
            <motion.p
              className="text-xs text-gray-500 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </motion.p>
          )}
        </div>

        {onSummarize && data.status === 'completed' && (
          <motion.div
            className="p-4 border-t border-cyan-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onSummarize}
              variant="outline"
              className="w-full border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              Generate Summary
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
