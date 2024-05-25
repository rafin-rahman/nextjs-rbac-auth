import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// get user info using prisma
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId } = body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json(user);
}