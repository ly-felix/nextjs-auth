import { NextRequest} from "next/server";
import { db } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { NextApiResponse } from "next/types";

export async function GET(
  req: NextRequest,  res: NextApiResponse,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const user = await db.user.findFirst({
    where: {
      ActivateToken: {
        some: {
          AND: [
            {
              activedAt: null,
            },
            {
              createdAt: {
                gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
              },
            },
            {
              token,
            },
          ],
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: { active: true },
  });

  await db.activateToken.update({
    where: { token, },
    data: {
      activedAt: new Date(Date.now()),
    },
  });
  
 
  res.redirect('/sign-in');
}
