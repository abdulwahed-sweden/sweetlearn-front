import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const users = [
  { id: 'usr_1', email: 'eliza.stone@example.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
  { id: 'usr_2', email: 'markus.hansen@example.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
  { id: 'usr_3', email: 'aiden.king@example.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
  { id: 'usr_4', email: 'leona.graham@example.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(users);
}
