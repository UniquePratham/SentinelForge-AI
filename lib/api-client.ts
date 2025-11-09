import axios, { AxiosError } from 'axios';
import type {
  DataAgentUploadResponse,
  DataAgentStatusResponse,
  IntentAgentResponse,
} from './types';

const DATA_AGENT_URL = process.env.NEXT_PUBLIC_DATA_AGENT_URL || 'http://139.84.219.118:4000';
const INTENT_AGENT_URL = process.env.NEXT_PUBLIC_INTENT_AGENT_URL || 'https://intent-agent.vercel.app';

const dataAgentClient = axios.create({
  baseURL: DATA_AGENT_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const intentAgentClient = axios.create({
  baseURL: INTENT_AGENT_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

dataAgentClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('[Data Agent Error]', error.message);
    return Promise.reject(error);
  }
);

intentAgentClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('[Intent Agent Error]', error.message);
    return Promise.reject(error);
  }
);

export const dataAgentAPI = {
  async health(): Promise<boolean> {
    try {
      const response = await dataAgentClient.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  },

  async uploadFile(file: File): Promise<DataAgentUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await dataAgentClient.post<DataAgentUploadResponse>(
      '/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getLogStatus(id: string): Promise<DataAgentStatusResponse> {
    const response = await dataAgentClient.get<DataAgentStatusResponse>(
      `/api/logs/${id}`
    );
    return response.data;
  },

  async summarizeLog(id: string): Promise<DataAgentStatusResponse> {
    const response = await dataAgentClient.post<DataAgentStatusResponse>(
      `/api/logs/${id}/summarize`
    );
    return response.data;
  },

  async deleteLog(id: string): Promise<void> {
    await dataAgentClient.delete(`/api/logs/${id}`);
  },

  async getAllLogs(): Promise<any[]> {
    const response = await dataAgentClient.get<any[]>('/api/logs');
    return response.data;
  },
};

export const intentAgentAPI = {
  async analyzeIntent(prompt: string): Promise<IntentAgentResponse> {
    // Use server-side proxy for intent analysis. If the proxy fails, bubble the error
    // so the frontend can handle it. No demo fallbacks are returned here.
    const response = await axios.post<IntentAgentResponse>(
      '/api/intent',
      { prompt },
      {
        // Increase timeout to accommodate slower intent analysis under load
        timeout: 60000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  },
};

export class PollingManager {
  private intervalId: NodeJS.Timeout | null = null;
  private currentDelay = 1500;
  private maxDelay = 30000;
  private backoffMultiplier = 1.5;

  async poll(
    checkFn: () => Promise<{ status: string; data?: any }>,
    onUpdate: (data: any) => void,
    maxAttempts = 40
  ): Promise<any> {
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const attemptPoll = async () => {
        try {
          attempts++;
          const result = await checkFn();

          onUpdate(result.data);

          if (result.status === 'completed' || result.status === 'error') {
            this.stop();
            resolve(result.data);
            return;
          }

          if (attempts >= maxAttempts) {
            this.stop();
            reject(new Error('Polling timeout exceeded'));
            return;
          }

          this.currentDelay = Math.min(
            this.currentDelay * this.backoffMultiplier,
            this.maxDelay
          );

          this.intervalId = setTimeout(attemptPoll, this.currentDelay);
        } catch (error) {
          this.stop();
          reject(error);
        }
      };

      attemptPoll();
    });
  }

  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    this.currentDelay = 1500;
  }
}
