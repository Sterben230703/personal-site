import ProjectDetailClient from '@/components/ProjectDetailClient';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
