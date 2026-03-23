import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PINPOINT_SUPABASE_URL = 'https://lwqzfqvigvqcigijrggc.supabase.co';
const PINPOINT_SERVICE_KEY = process.env.PINPOINT_SERVICE_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // If we have Supabase configured, store there
    if (PINPOINT_SERVICE_KEY) {
      const supabase = createClient(PINPOINT_SUPABASE_URL, PINPOINT_SERVICE_KEY);
      const { data, error } = await supabase.rpc('ingest_report', {
        p_api_key: body.projectId,
        p_report: body,
      });
      if (error) {
        console.error('[Pinpoint] Supabase ingest error:', error);
      }
    }
    
    // Always log to server console for now
    console.log('[Pinpoint Report]', JSON.stringify({
      type: body.type,
      url: body.url,
      pin: body.pin ? { x: body.pin.x, y: body.pin.y, comment: body.pin.comment } : null,
      errors: body.errors?.length || 0,
      console: body.console?.length || 0,
    }));

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[Pinpoint] Ingest error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

// CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
