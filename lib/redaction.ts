const PATTERNS = {
  apiKey: /[a-zA-Z0-9_-]{32,}/g,
  jwt: /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g,
  base64Long: /(?:[A-Za-z0-9+/]{4}){8,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?/g,
  privateIP: /\b(?:10|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/g,
  awsKey: /AKIA[0-9A-Z]{16}/g,
  password: /(?:password|passwd|pwd)[\s:=]+[\S]+/gi,
};

export function redactSensitiveData(text: string): string {
  if (!text) return text;

  let redacted = text;

  redacted = redacted.replace(PATTERNS.jwt, '[REDACTED_JWT]');
  redacted = redacted.replace(PATTERNS.awsKey, '[REDACTED_AWS_KEY]');
  redacted = redacted.replace(PATTERNS.password, (match) => {
    const prefix = match.split(/[:=\s]/)[0];
    return `${prefix}: [REDACTED]`;
  });

  redacted = redacted.replace(PATTERNS.base64Long, (match) => {
    if (match.length > 64) {
      return '[REDACTED_BASE64]';
    }
    return match;
  });

  redacted = redacted.replace(PATTERNS.apiKey, (match) => {
    if (match.length >= 40) {
      return '[REDACTED_KEY]';
    }
    return match;
  });

  return redacted;
}

export function redactObject(obj: any): any {
  if (typeof obj === 'string') {
    return redactSensitiveData(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(redactObject);
  }

  if (obj && typeof obj === 'object') {
    const redacted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      redacted[key] = redactObject(value);
    }
    return redacted;
  }

  return obj;
}

export function isSensitive(text: string): boolean {
  return (
    PATTERNS.jwt.test(text) ||
    PATTERNS.awsKey.test(text) ||
    PATTERNS.password.test(text) ||
    (PATTERNS.apiKey.test(text) && text.length >= 40)
  );
}
