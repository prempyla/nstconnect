// src/components/SafeRooms/MyRooms.js
"use client";

import { useState, useEffect } from 'react';
import styles from './MyRooms.module.css';

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This is where we'll fetch from PocketBase
    // For now, just mock some data
    setTimeout(() => {
      setRooms([
        {
          id: '1',
          name: 'Exam Stress Support',
          category: 'Study',
          memberCount: 5,
          lastActivity: new Date()
        },
        {
          id: '2',
          name: 'Freshman Homesickness',
          category: 'Homesick',
          memberCount: 3,
          lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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
        <p className={styles.emptyText}>You haven't created or joined any safe rooms yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>MY SAFE ROOMS</h2>
      
      <div className={styles.roomList}>
        {rooms.map(room => (
          <div key={room.id} className={styles.roomCard}>
            <div className={styles.roomHeader}>
              <div className={styles.category}>{room.category}</div>
              <div className={styles.members}>{room.memberCount} members</div>
            </div>
            
            <h3 className={styles.roomName}>{room.name}</h3>
            
            <div className={styles.activity}>
              Last activity: {formatTimeAgo(room.lastActivity)}
            </div>
            
            <button className={styles.enterButton}>Enter Room</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatTimeAgo(date) {
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