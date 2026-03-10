'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import DevLoginModal from './DevLoginModal';

export default function DevButton() {
  const { isDevMode, logout, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) return null;

  if (isDevMode) {
    return (
      <button
        onClick={logout}
        className="dev-button dev-button-active"
        title="Click to logout"
      >
        DEV
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="dev-button"
        title="Dev login"
      >
        &gt;_
      </button>
      {showModal && <DevLoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}
