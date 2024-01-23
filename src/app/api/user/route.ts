import {NextResponse} from 'next/server';
import { SHA256 as sha256 } from "crypto-js";
import { Prisma } from "@prisma/client";
import prisma from '../../../../lib/prisma';

export async function POST (req:Request){
  try{
    const body = await req.json();
    const { email, password } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if(existingUserByEmail){
      return NextResponse.json({error: 'Email already exists'}, {status: 409});
    }
    
    const newUser = await prisma.user.create({
      data: {
        email: email,
        hash: hashPassword(password),
      },
    });
    return NextResponse.json({user: newUser, message: "User created successfully"}, {status: 201});

  } catch(error){
    return NextResponse.json({message: "Something went wrong"}, {status: 500});
  }
} 


export const hashPassword = (password: string) => {
  return sha256(password).toString();
};
