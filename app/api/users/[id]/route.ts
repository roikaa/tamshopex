
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/middleware/auth'
import { hashPassword } from '@/lib/auth'

// GET single user
export const GET = requireAuth(async (request: NextRequest, { params, user }: any) => {
  try {
    const { id } = params
    
    // Users can only access their own data unless they're admin
    if (user.role !== 'ADMIN' && user.userId !== id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    const userData = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        orders: {
          select: {
            id: true,
            createdAt: true,
            // Add other order fields as needed
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        cart: {
          select: {
            id: true,
            // Add cart fields as needed
          }
        }
      }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(userData)

  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// PUT update user
export const PUT = requireAuth(async (request: NextRequest, { params, user }: any) => {
  try {
    const { id } = params
    const { name, email, password, role } = await request.json()
    
    // Users can only update their own data unless they're admin
    if (user.role !== 'ADMIN' && user.userId !== id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Only admins can change roles
    if (role && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only admins can change user roles' },
        { status: 403 }
      )
    }

    // Check if email is already taken (if changing email)
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id }
        }
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already taken' },
          { status: 409 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email) updateData.email = email
    if (password) updateData.password = await hashPassword(password)
    if (role && user.role === 'ADMIN') updateData.role = role

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json(updatedUser)

  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})

// DELETE user
export const DELETE = requireAuth(async (request: NextRequest, { params, user }: any) => {
  try {
    const { id } = params
    
    // Users can only delete their own account unless they're admin
    if (user.role !== 'ADMIN' && user.userId !== id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Prevent deleting the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await prisma.user.count({
        where: { role: 'ADMIN' }
      })
      
      const userToDelete = await prisma.user.findUnique({
        where: { id },
        select: { role: true }
      })

      if (userToDelete?.role === 'ADMIN' && adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin user' },
          { status: 400 }
        )
      }
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })

  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
})
