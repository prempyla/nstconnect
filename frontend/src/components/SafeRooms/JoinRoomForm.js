// src/components/SafeRooms/JoinRoomForm.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './JoinRoomForm.module.css';
import { safeRoomsAPI } from '@/lib/api';

export default function JoinRoomForm({ onRoomJoined }) {
  const [roomCode, setRoomCode] = useState('');
  const [joinedRoomId, setJoinedRoomId] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setRoomInfo(null);

    try {
      const response = await safeRoomsAPI.join(roomCode);
      setJoinedRoomId(response.room?.id || null);
      setSuccess(true);
      if (onRoomJoined) {
        onRoomJoined(response.room);
      }
    } catch (err) {
      setError('Room not found. Please check the code and try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successContainer}>
        <h2 className={styles.successTitle}>Successfully Joined Room!</h2>
        <p className={styles.successMessage}>You have joined the safe room.</p>
        <button
          className={styles.enterButton}
          onClick={() => joinedRoomId && router.push(`/safe-rooms/${joinedRoomId}`)}
        >
          Enter Room
        </button>
      </div>
    );
  }

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