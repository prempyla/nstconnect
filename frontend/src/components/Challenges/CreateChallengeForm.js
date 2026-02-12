// src/components/Challenges/CreateChallengeForm.js
"use client";

import { useState } from 'react';
import styles from './CreateChallengeForm.module.css';
import { challengesAPI } from '@/lib/api';

export default function CreateChallengeForm({ onChallengeCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [isPublic, setIsPublic] = useState(true); // Public by default
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!title.trim()) {
      setError('Please enter a challenge title');
      setIsSubmitting(false);
      return;
    }

    if (duration < 1 || duration > 365) {
      setError('Duration must be between 1 and 365 days');
      setIsSubmitting(false);
      return;
    }

    try {
      // Calculate end date from duration
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + duration);

      // Create challenge via API
      const newChallenge = await challengesAPI.create({
        title: title.trim(),
        prompt: description.trim() || title.trim(),
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        isPublic: isPublic
      });

      // Notify parent component
      if (onChallengeCreated) {
        onChallengeCreated(newChallenge);
      }

      // Reset form
      setTitle('');
      setDescription('');
      setDuration(30);
      setIsPublic(true);

    } catch (err) {
      setError('Error creating challenge. Please try again.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create a New Challenge</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="challenge-title" className={styles.label}>
            Challenge Title
          </label>
          <input
            id="challenge-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 30-Day Coding Challenge"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will you do in this challenge? Set clear rules for yourself."
            className={styles.textarea}
            rows={4}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="duration" className={styles.label}>
              Duration (days)
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              max="365"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Visibility
          </label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={isPublic === true}
                onChange={() => setIsPublic(true)}
                className={styles.radioInput}
              />
              <span>Public (Open to all)</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={isPublic === false}
                onChange={() => setIsPublic(false)}
                className={styles.radioInput}
              />
              <span>Private (Only for me)</span>
            </label>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Challenge'}
          </button>
        </div>
      </form>
    </div>
  );
}