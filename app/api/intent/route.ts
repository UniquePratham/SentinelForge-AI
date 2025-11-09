import { NextRequest, NextResponse } from 'next/server';

const INTENT_AGENT_URL = process.env.NEXT_PUBLIC_INTENT_AGENT_URL || 'https://intent-agent.vercel.app';

export async function POST(request: NextRequest) {
  let requestBody: any = {};

  try {
    requestBody = await request.json();
    const { prompt } = requestBody;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('🔄 Proxying request to Intent Agent:', INTENT_AGENT_URL);
    console.log('📝 Prompt:', prompt.substring(0, 100) + '...');

    // Make the request to the Intent Agent API with a server-side timeout
    const TIMEOUT_MS = parseInt(process.env.NEXT_INTENT_PROXY_TIMEOUT_MS || '60000', 10);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${INTENT_AGENT_URL}/analyze-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'SentinelForge/1.0',
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        console.error('❌ Intent Agent proxy timed out after', TIMEOUT_MS, 'ms');
        return NextResponse.json(
          { error: `Intent Agent proxy timed out after ${TIMEOUT_MS}ms` },
          {
            status: 504,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          }
        );
      }

      // Other network/fetch errors
      console.error('❌ Fetch error when contacting Intent Agent:', err);
      return NextResponse.json(
        { error: err?.message || 'Intent Agent proxy fetch error' },
        {
          status: 502,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    console.log('📡 Intent Agent response status:', response.status);

    if (!response.ok) {
      console.error('❌ Intent Agent responded with:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('❌ Error response body:', errorText);
      throw new Error(`Intent Agent API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Intent Agent response received successfully');
    console.log('📊 Response data keys:', Object.keys(data));

    // Return the response with CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error: any) {
    console.error('❌ Intent Agent proxy error:', error.message);
    console.error('❌ Full error:', error);
    // Return an error to the caller. Do not provide demo/mocked analysis here.
    return NextResponse.json(
      { error: error?.message || 'Intent Agent proxy error' },
      {
        status: 502,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}