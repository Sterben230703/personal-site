import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>404 - Page Not Found</h2>
      <p style={{ marginBottom: '1rem' }}>The page you are looking for does not exist.</p>
      <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
        Go Home
      </Link>
    </div>
  );
}
