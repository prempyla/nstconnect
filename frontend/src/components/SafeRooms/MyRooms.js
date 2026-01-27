// src/components/SafeRooms/MyRooms.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MyRooms.module.css';
import { safeRoomsAPI } from '@/lib/api';

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await safeRoomsAPI.getMyRooms();
      // Backend returns { data: [...] }
      setRooms(response.data || []);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to load your rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading your rooms...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No Rooms Found</h2>
        <p className={styles.emptyText}>
          You haven&apos;t created or joined any safe rooms yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>MY SAFE ROOMS</h2>

      <div className={styles.roomList}>
        {rooms.map((room) => (
          <div key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              {/* Backend returns isPublic (camelCase) */}
              <div className={styles.category}>
                {room.isPublic ? 'Public' : 'Private'}
              </div>
              <div className={styles.role}>{room.role}</div>
            </div>

            <h3 className={styles.roomName}>{room.name}</h3>

            {room.description && (
              <p className={styles.description}>{room.description}</p>
            )}

            {!room.isPublic && room.joinCode && (
              <div className={styles.joinCodeBadge}>
                Code: <strong>{room.joinCode}</strong>
              </div>
            )}

            <div className={styles.activity}>
              Created: {formatTimeAgo(room.createdAt)}
            </div>

            <button
              className={styles.enterButton}
              onClick={() => router.push(`/safe-rooms/${room.id}`)}
            >
              Enter Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTimeAgo(date) {
  if (!date) return 'recently';
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${diffDays}d ago`;
}