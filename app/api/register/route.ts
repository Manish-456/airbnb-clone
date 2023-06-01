import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb.';
import {NextResponse} from 'next/server'
export async function POST(
    request : Request
) {
  const body = await request.json()
  const {email, name, password} = body;

  if(!email || !name || !password) return NextResponse.json({
   message : "All fields are required" 
  }, {
    status : 422
  })

  // hash password
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(password, salt);
 
  const user = await prisma.user.create({
    data : {
        email,
        name,
        hashedPassword: newHashedPassword
    }
  })
  const {hashedPassword, ...others} = user
  return NextResponse.json(others, {status : 201})
} 
