import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const generateRequestSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Username can only contain lowercase letters, numbers, and hyphens'
    )
    .refine((val) => !val.startsWith('-') && !val.endsWith('-'), {
      message: 'Username cannot start or end with a hyphen',
    }),
  resumeData: z.object({
    personalInfo: z.object({
      fullName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      location: z.string().optional(),
      title: z.string().optional(),
      summary: z.string().optional(),
      website: z.string().url().optional().or(z.literal('')),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }),
    experience: z.array(z.any()),
    education: z.array(z.any()),
    skills: z.array(z.any()),
    selectedTemplate: z.string().nullable(),
  }),
});

// In a real app, this would check against a database
// For now, we'll use a simple in-memory set for demo purposes
const reservedUsernames = new Set([
  'admin',
  'api',
  'www',
  'app',
  'create',
  'login',
  'signup',
  'dashboard',
  'settings',
  'profile',
  'about',
  'contact',
  'terms',
  'privacy',
  'help',
  'support',
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = generateRequestSchema.parse(body);

    // Check if username is reserved
    if (reservedUsernames.has(validatedData.username)) {
      return NextResponse.json(
        { error: 'Username is reserved' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Check if username is available in database
    // 2. Save resume data to database with username as key
    // 3. Return the generated URL

    // For now, we'll just validate and return success
    const url = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${validatedData.username}`;

    return NextResponse.json({
      success: true,
      url,
      username: validatedData.username,
      message: 'Resume URL generated successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  // Validate username format
  try {
    generateRequestSchema.shape.username.parse(username);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { available: false, error: error.issues[0].message },
        { status: 200 }
      );
    }
  }

  // Check if username is reserved or taken
  const isAvailable = !reservedUsernames.has(username);

  return NextResponse.json({
    available: isAvailable,
    username,
  });
}
