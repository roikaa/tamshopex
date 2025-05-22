// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export function requireAuth(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return async (req: NextRequest, context: any) => {
    const token = getTokenFromRequest(req)
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Add user info to the request context
    context.user = decoded
    return handler(req, context)
  }
}

export function requireAdmin(handler: (req: NextRequest, context: any) => Promise<NextResponse>) {
  return requireAuth(async (req: NextRequest, context: any) => {
    if (context.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    return handler(req, context)
  })
}
