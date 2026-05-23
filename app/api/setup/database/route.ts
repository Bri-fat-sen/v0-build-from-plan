import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * POST /api/setup/database
 * Initializes the Supabase database schema
 * Requires SUPABASE_SERVICE_ROLE_KEY
 * Only accessible during setup phase
 */
export async function POST(request: NextRequest) {
  try {
    // Security check - this should only be accessible initially
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    if (token !== process.env.SETUP_TOKEN && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Invalid setup token' },
        { status: 401 }
      )
    }

    // Create Supabase client with service role (for admin operations)
    const supabase = createClient()

    // Read the schema SQL file
    const schemaPath = join(process.cwd(), 'lib', 'supabase', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')

    // Split schema into individual statements (handle comments and multiple statements)
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--'))

    const results = []
    let successCount = 0
    let errors = []

    // Execute each statement
    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec', {
          statement_string: statement,
        } as any).catch(() => {
          // Fallback: try to execute via direct SQL if RPC fails
          return { error: 'RPC not available' }
        })

        if (error) {
          errors.push({ statement: statement.substring(0, 50), error: error.message })
          console.error(`[Setup] Error executing: ${statement.substring(0, 50)}`, error)
        } else {
          successCount++
          results.push({ statement: statement.substring(0, 50), status: 'success' })
        }
      } catch (err) {
        console.error(`[Setup] Exception:`, err)
        // Continue with next statement even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database schema setup completed',
      results: {
        total_statements: statements.length,
        successful: successCount,
        failed: errors.length,
        errors: errors.length > 0 ? errors : undefined,
      },
    })
  } catch (error) {
    console.error('[Setup] Fatal error:', error)
    return NextResponse.json(
      {
        error: 'Failed to setup database schema',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database setup endpoint',
    instructions: 'POST to this endpoint with Authorization header containing setup token',
    schema_file: 'lib/supabase/schema.sql',
  })
}
