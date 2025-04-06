'use client';
import { useAuth } from '@/app/context/auth-context';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Header() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-600">🧠</span>
        <h1 className="text-lg font-semibold">AI Resume and Cover Letter Generator</h1>
      </div>

      {user && (
        <nav className="flex gap-4">
          <Link href="/generate" className="hover:underline">Generate</Link>
          <Link href="/history" className="hover:underline">History</Link>
          <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
        </nav>
      )}
    </header>
  );
}
