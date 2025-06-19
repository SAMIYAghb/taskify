// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma"; // <- ton chemin dépend de output dans schema.prisma

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json({ error: "Le titre est requis." }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Erreur création tâche:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Erreur récupération tâches:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}