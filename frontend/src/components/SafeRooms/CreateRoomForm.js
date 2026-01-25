// src/components/SafeRooms/CreateRoomForm.js
"use client";

import { useState } from 'react';
import styles from './CreateRoomForm.module.css';
import { safeRoomsAPI } from '@/lib/api';

export default function CreateRoomForm({ onRoomCreated }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vent');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await safeRoomsAPI.create({
        name,
        description: description ? `${category}: ${description}` : category,
        isPublic, // backend expects camelCase isPublic
      });

      // Backend returns { id, description, isPublic, joinCode, createdAt }
      if (onRoomCreated) {
        onRoomCreated({
          ...response,
          joinCode: response.joinCode || null,
        });
      }
    } catch (err) {
      setError('Error creating room. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span className={styles.visibilityTitle}>Room Visibility:</span>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className={styles.radioInput}
              />
              Private Room
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className={styles.radioInput}
              />
              Public Room
            </label>
          </div>
          <p className={styles.visibilityDescription}>
            {isPublic
              ? 'Anyone can discover and join this room from Available Rooms.'
              : 'Only people with the room code can join this room.'}
          </p>
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
