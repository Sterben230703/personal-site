import fs from 'fs';
import path from 'path';

export interface Project {
  slug: string;
  name: string;
  category?: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

const PROJECTS_FILE = path.join(process.cwd(), 'content/projects.json');

export function getAllProjects(): Project[] {
  const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find(p => p.slug === slug);
}

export function saveProjects(projects: Project[]): void {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}
