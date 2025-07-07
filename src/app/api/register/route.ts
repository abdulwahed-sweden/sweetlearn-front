import { NextResponse } from 'next/server';

const existingUsers = [
  'user1@example.com',
  'user2@example.com',
  'user3@example.com',
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate a potential conflict
    if (existingUsers.includes(email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    existingUsers.push(email);

    return NextResponse.json({ 
      message: 'User registered successfully', 
      user: { id: new Date().getTime(), email, createdAt: new Date().toISOString() } 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
