// src/components/SafeRooms/AvailableRooms.js
"use client";

import { useState, useEffect } from 'react';
import styles from './AvailableRooms.module.css';
import { getPublicSafeRooms, joinSafeRoom } from '@/lib/pocketbase';

export default function AvailableRooms({ onRoomJoined }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningRoomId, setJoiningRoomId] = useState(null);

  useEffect(() => {
    const fetchPublicRooms = async () => {
      try {
        const publicRooms = await getPublicSafeRooms();
        setRooms(publicRooms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching public rooms:", err);
        setError("Failed to load available rooms. Please try again later.");
        setLoading(false);
      }
    };

    setLoading(true);
    fetchPublicRooms();
  }, []);

  const handleJoinRoom = async (roomId, roomCode) => {
    try {
      setJoiningRoomId(roomId);
      await joinSafeRoom(roomCode);
      
      // Notify parent component about successful join
      if (onRoomJoined) {
        onRoomJoined();
      }
    } catch (err) {
      console.error("Error joining room:", err);
      setError("Failed to join the room. Please try again.");
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
        <p className={styles.emptyText}>There are currently no public rooms available to join.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>AVAILABLE ROOMS</h2>
      <p className={styles.subtitle}>Join any of these public rooms anonymously</p>
      
      <div className={styles.roomList}>
        {rooms.map(room => (
          <div key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              <div className={styles.category}>{room.category}</div>
              <div className={styles.members}>{room.memberCount} members</div>
            </div>
            
            <h3 className={styles.roomName}>{room.name}</h3>
            
            {room.description && (
              <p className={styles.description}>{room.description}</p>
            )}
            
            <div className={styles.activity}>
              Last activity: {formatTimeAgo(room.lastActivity || room.created)}
            </div>
            
            <button 
              className={styles.joinButton}
              onClick={() => handleJoinRoom(room.id, room.roomCode)}
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
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHrs < 24) {
    return `${diffHrs} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
}