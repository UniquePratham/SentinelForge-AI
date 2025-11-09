import type { ReportData } from './types';

export function exportToJSON(data: ReportData): string {
  return JSON.stringify(data, null, 2);
}

export function exportToCSV(data: ReportData): string {
  const rows: string[][] = [
    ['Scan ID', data.scan_id],
    ['Timestamp', data.timestamp],
    ['Total Issues', data.summary.total_issues.toString()],
    ['Critical', data.summary.critical_count.toString()],
    ['High', data.summary.high_count.toString()],
    ['Medium', data.summary.medium_count.toString()],
    ['Low', data.summary.low_count.toString()],
    ['Threat Score', data.summary.threat_score.toFixed(2)],
    [],
    ['Recommendations'],
    ...data.recommendations.map((rec) => [rec]),
  ];

  return rows.map((row) => row.join(',')).join('\n');
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
