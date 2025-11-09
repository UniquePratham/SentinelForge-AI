import type { Vulnerability, SeverityLevel } from './types';

interface HeuristicPattern {
  pattern: RegExp;
  type: string;
  severity: SeverityLevel;
  description: string;
  cwe?: string;
  remediation?: string;
}

const HEURISTIC_PATTERNS: HeuristicPattern[] = [
  {
    pattern: /eval\s*\(/gi,
    type: 'Code Execution',
    severity: 'critical',
    description: 'Use of eval() function detected, which can execute arbitrary code',
    cwe: 'CWE-95',
    remediation: 'Avoid using eval(). Use safer alternatives like JSON.parse() for data.',
  },
  {
    pattern: /exec\s*\(/gi,
    type: 'Command Execution',
    severity: 'critical',
    description: 'Command execution function detected',
    cwe: 'CWE-78',
    remediation: 'Validate and sanitize all inputs. Use parameterized commands.',
  },
  {
    pattern: /(?:SELECT|INSERT|UPDATE|DELETE).*(?:OR|AND)\s+\d+\s*=\s*\d+/gi,
    type: 'SQL Injection',
    severity: 'critical',
    description: 'Potential SQL injection pattern detected',
    cwe: 'CWE-89',
    remediation: 'Use parameterized queries or prepared statements.',
  },
  {
    pattern: /<script[^>]*>.*?<\/script>/gi,
    type: 'XSS Vulnerability',
    severity: 'high',
    description: 'Unescaped script tags detected',
    cwe: 'CWE-79',
    remediation: 'Sanitize and escape all user inputs. Use Content Security Policy.',
  },
  {
    pattern: /(?:password|passwd|pwd|secret|token|api_key)\s*[:=]\s*[^\s]+/gi,
    type: 'Hardcoded Credentials',
    severity: 'high',
    description: 'Hardcoded credentials or secrets detected',
    cwe: 'CWE-798',
    remediation: 'Use environment variables or secure vault services for credentials.',
  },
  {
    pattern: /(?:[A-Za-z0-9+/]{40,}={0,2})/gi,
    type: 'Suspicious Base64',
    severity: 'medium',
    description: 'Long base64-encoded string detected',
    remediation: 'Review encoded content for potential obfuscation or data exfiltration.',
  },
  {
    pattern: /(?:http|ftp)s?:\/\/(?:[\w-]+\.)*[\w-]+(?:\.[a-z]{2,})+(?:\/[^\s]*)?/gi,
    type: 'External URL',
    severity: 'medium',
    description: 'External URL detected',
    remediation: 'Validate URL destinations and implement allowlists for external resources.',
  },
  {
    pattern: /innerHTML\s*=|document\.write\(/gi,
    type: 'DOM Manipulation',
    severity: 'medium',
    description: 'Potentially unsafe DOM manipulation detected',
    cwe: 'CWE-79',
    remediation: 'Use textContent or sanitize HTML before insertion.',
  },
  {
    pattern: /fs\.(?:readFile|writeFile|unlink|rmdir)/gi,
    type: 'File System Access',
    severity: 'medium',
    description: 'Direct file system access detected',
    cwe: 'CWE-73',
    remediation: 'Validate file paths and implement proper access controls.',
  },
  {
    pattern: /process\.env\./gi,
    type: 'Environment Access',
    severity: 'low',
    description: 'Access to environment variables detected',
    remediation: 'Ensure sensitive environment variables are not logged or exposed.',
  },
];

export function analyzeWithHeuristics(data: any): Vulnerability[] {
  const vulnerabilities: Vulnerability[] = [];
  const textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const lines = textContent.split('\n');

  lines.forEach((line, index) => {
    HEURISTIC_PATTERNS.forEach((heuristic) => {
      const matches = line.match(heuristic.pattern);
      if (matches) {
        matches.forEach((match) => {
          vulnerabilities.push({
            type: heuristic.type,
            severity: heuristic.severity,
            line: index + 1,
            snippet: line.trim().substring(0, 100),
            description: heuristic.description,
            cwe: heuristic.cwe,
            remediation: heuristic.remediation,
          });
        });
      }
    });
  });

  return vulnerabilities;
}

export function calculateThreatScore(vulnerabilities: Vulnerability[]): number {
  const severityWeights = {
    critical: 10,
    high: 7,
    medium: 4,
    low: 1,
  };

  const totalScore = vulnerabilities.reduce((score, vuln) => {
    return score + severityWeights[vuln.severity];
  }, 0);

  return Math.min(totalScore / 10, 10);
}

export function getSeverityCounts(vulnerabilities: Vulnerability[]) {
  return vulnerabilities.reduce(
    (counts, vuln) => {
      counts[vuln.severity]++;
      return counts;
    },
    { critical: 0, high: 0, medium: 0, low: 0 } as Record<SeverityLevel, number>
  );
}
