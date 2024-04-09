import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const data = await req.json();
    const { email } = data;
    const user = await db.user.findUnique({
      where: { email: email },
    });

    const totalUsers = await db.user.count();
    const totalUsersActiveToday = await db.user.count({
      where: {
        lastActiveSession: {
          gte: todayStart,
        },
      },
    });

    const totalUsersActive7day = await db.user.count({
      where: {
        lastActiveSession: {
          gte: startDate,
        },
      },
    });

    const body = {
      createdAt: user?.createdAt,
      loginCount: user?.loginCount,
      lastActiveSession: user?.lastActiveSession,
      totalUsers: totalUsers,
      totalUsersActiveToday: totalUsersActiveToday,
      totalUsersActive7day: totalUsersActive7day,
    };

    return NextResponse.json({ message: "dashboard message got", body }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
