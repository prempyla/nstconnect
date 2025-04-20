// src/components/SafeRooms/MyRooms.js
"use client";

import { useState, useEffect } from 'react';
import styles from './MyRooms.module.css';
import { getMySafeRooms } from '@/lib/pocketbase';

export default function MyRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getMySafeRooms();
        
        // Process rooms to ensure they have all required properties
        const processedRooms = fetchedRooms.map(room => ({
          id: room.id,
          name: room.name,
          category: room.category,
          memberCount: room.memberCount || 1, // Default if not set
          lastActivity: room.lastActivity ? new Date(room.lastActivity) : new Date(room.created || Date.now())
        }));
        
        setRooms(processedRooms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load your rooms. Please try again later.");
        setLoading(false);
      }
    };

    fetchRooms();
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