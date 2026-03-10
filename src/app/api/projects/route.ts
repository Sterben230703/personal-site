import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, saveProjects, Project } from '@/lib/projects';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  const projects = getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get('dev_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: Project = await request.json();

  if (!body.slug && body.name) {
    body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  const projects = getAllProjects();
  projects.push(body);
  saveProjects(projects);

  return NextResponse.json(body, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('dev_token')?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body: Project = await request.json();
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.slug === body.slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  projects[index] = body;
  saveProjects(projects);

  return NextResponse.json(body);
}
