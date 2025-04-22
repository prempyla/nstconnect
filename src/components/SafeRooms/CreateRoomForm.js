// src/components/SafeRooms/CreateRoomForm.js
"use client";

import { useState } from 'react';
import styles from './CreateRoomForm.module.css';
import { createSafeRoom } from '@/lib/pocketbase';

export default function CreateRoomForm({ onRoomCreated }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vent');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [roomCode, setRoomCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
        const room = await createSafeRoom({ name, category, description, isPublic });
        setRoomCode(room.roomCode);
        
        // Notify parent component if callback provided
        if (onRoomCreated) {
          onRoomCreated(room);
        }
      } catch (err) {
        setError('Error creating room. Please try again.');
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
  };

  if (roomCode) {
    return (
      <div className={styles.successContainer}>
        <h2 className={styles.successTitle}>Room Created Successfully!</h2>
        <p className={styles.successMessage}>Share this code with others to invite them to your room:</p>
        <div className={styles.roomCode}>{roomCode}</div>
        <button className={styles.enterButton}>Enter Room</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.formTitle}>CREATE A SAFE ROOM</h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="room-name" className={styles.label}>Room Name</label>
          <input
            id="room-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Give your room a name"
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Category</label>
          <select 
            id="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
            required
          >
            <option value="Vent">Vent Zone</option>
            <option value="Study">Study Stress</option>
            <option value="Chill">Just Chilling</option>
            <option value="Personal">Personal Struggles</option>
            <option value="Homesick">Homesickness</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this room is about..."
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.visibilityToggle}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider}></span>
            </label>
            <div className={styles.toggleText}>
              <span className={styles.visibilityTitle}>Room Visibility: </span>
              <span className={styles.visibilityValue}>
                {isPublic ? 'Public' : 'Private'} Room
              </span>
              <p className={styles.visibilityDescription}>
                {isPublic 
                  ? 'Anyone can discover and join this room from Available Rooms.' 
                  : 'Only people with the room code can join this room.'}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Room'}
        </button>
      </form>
    </div>
  );
}