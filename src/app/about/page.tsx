export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-10 text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>
      <h1 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--text-heading)' }}>🙋 About Me</h1>
      <p className="mb-5">
        Hi, I'm <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>Anand Jaiswal</span>, a curious learner in the field of <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>Computer Science</span>.<br />
        I've explored many fundamental areas of CS but haven't fully settled on a single path yet.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3 border-l-4 border-indigo-500 pl-2" style={{ color: 'var(--text-heading)' }}>
        Currently, I'm deeply interested in:
      </h2>
      <ul className="space-y-1 list-disc list-inside">
        <li>💻 Software Engineering</li>
        <li>🏆 Competitive Programming</li>
        <li>🤖 Artificial Intelligence &amp; Large Language Models (LLMs)</li>
        <li>🖥️ Firmware &amp; Linux Kernel Development</li>
      </ul>
      <p className="mt-3">
        I enjoy the blend of low-level systems work and cutting-edge AI research, and I'm constantly exploring ways to connect both worlds.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-3 border-l-4 border-indigo-500 pl-2" style={{ color: 'var(--text-heading)' }}>✨ Why This Blog?</h2>
      <ul className="space-y-1 list-disc list-inside">
        <li>📘 Share my learnings and experiences</li>
        <li>📝 Build a personal knowledge base (a place I can revise and refer back to)</li>
        <li>🌐 Escape the noise of social media and focus on deep work &amp; reflection</li>
      </ul>

      <h2 className="text-lg font-semibold mt-8 mb-3 border-l-4 border-indigo-500 pl-2" style={{ color: 'var(--text-heading)' }}>🌱 Beyond Tech</h2>
      <ul className="space-y-1 list-disc list-inside">
        <li>✈️ I have interest in Solo Trips, would love to wander across nations.</li>
        <li>⚡ Working on personal projects</li>
        <li>💻 Contributing to open-source initiatives</li>
        <li>🤝 Engaging with communities that value collaboration and innovation</li>
      </ul>

      <p className="text-center italic mt-10" style={{ color: 'var(--text-color)' }}>
        Thanks for stopping by and reading my first post! ✍️ <br />
        Stay tuned for upcoming posts 🚀
      </p>
    </div>
  );
}
