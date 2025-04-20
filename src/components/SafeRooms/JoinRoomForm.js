// src/components/SafeRooms/JoinRoomForm.js
"use client";

import { useState } from 'react';
import styles from './JoinRoomForm.module.css';
import { joinSafeRoom } from '@/lib/pocketbase';

export default function JoinRoomForm({ onRoomJoined }) {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const room = await joinSafeRoom(roomCode);
      
      // Notify parent component
      if (onRoomJoined) {
        onRoomJoined(room);
      }
      
      // Reset form
      setRoomCode('');
    } catch (err) {
      setError('Room not found. Please check the code and try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className={styles.formTitle}>JOIN A SAFE ROOM</h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="room-code" className={styles.label}>Room Code</label>
          <input
            id="room-code"
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="Enter room code (e.g., ABCD1234)"
            className={styles.input}
            maxLength={8}
            required
          />
        </div>
        
        <p className={styles.helpText}>
          Enter the room code shared with you to join a safe room.
        </p>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Joining...' : 'Join Room'}
        </button>
      </form>
    </div>
  );
}