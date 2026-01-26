// src/components/SafeRooms/AvailableRooms.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AvailableRooms.module.css';
import { safeRoomsAPI } from '@/lib/api';

export default function AvailableRooms({ onRoomJoined }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningRoomId, setJoiningRoomId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchPublicRooms();
  }, []);

  const fetchPublicRooms = async () => {
    try {
      setLoading(true);
      const response = await safeRoomsAPI.getPublic();
      // Backend returns { data: [...] }
      setRooms(response.data || []);
    } catch (err) {
      console.error('Error fetching public rooms:', err);
      setError('Failed to load available rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (roomId) => {
    try {
      setJoiningRoomId(roomId);
      const response = await safeRoomsAPI.joinById(roomId);
      if (onRoomJoined) {
        onRoomJoined();
      }
      // Navigate to the room
      router.push(`/safe-rooms/${roomId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Failed to join the room. Please try again.');
    } finally {
      setJoiningRoomId(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading available rooms...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No Public Rooms Available</h2>
        <p className={styles.emptyText}>
          There are currently no public rooms. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>AVAILABLE ROOMS</h2>
      <p className={styles.subtitle}>Join any of these public rooms anonymously</p>

      <div className={styles.roomList}>
        {rooms.map((room) => (
          <div key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              <div className={styles.category}>Public Room</div>
              {/* Backend returns memberCount */}
              <div className={styles.members}>{room.memberCount ?? 0} members</div>
            </div>

            <h3 className={styles.roomName}>{room.name}</h3>

            {room.description && (
              <p className={styles.description}>{room.description}</p>
            )}

            <div className={styles.activity}>
              Created: {formatTimeAgo(room.createdAt)}
            </div>

            <button
              className={styles.joinButton}
              onClick={() => handleJoinRoom(room.id)}
              disabled={joiningRoomId === room.id}
            >
              {joiningRoomId === room.id ? 'Joining...' : 'Join Room'}
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