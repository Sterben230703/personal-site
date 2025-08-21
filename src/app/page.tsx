import Layout from "@/components/layout";
import Image from "next/image";

// src/app/page.tsx
export default function Home() {
  return (
    <Layout>
      <div>
      <h1 className="text-2xl font-bold mb-2">Anand Jaiswal</h1>
      <p className="text-sm mb-4">Competitive Programmer, Software engineer, AI Enthusiast</p>
      <div className="rounded-xl overflow-hidden max-w-5xl">
        <Image
          src="/images/self2.jpg"
          alt="Anand Jaiswal"
          width={400}    // smaller width
          height={300}   // proportional height
          className="rounded-xl shadow-lg object-cover"
        />

      </div>
      </div>
    </Layout>
  );
}
