// src/components/Challenges/CreateChallengeForm.js
"use client";

import { useState } from 'react';
import styles from './CreateChallengeForm.module.css';

export default function CreateChallengeForm({ onChallengeCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Productivity');
  const [duration, setDuration] = useState(30);
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
      // Create new challenge object
      const newChallenge = {
        id: 'c' + Date.now(),
        title,
        description,
        category,
        totalDays: duration
      };
      
      // Wait a bit to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Notify parent component
      if (onChallengeCreated) {
        onChallengeCreated(newChallenge);
      }
      
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
          
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <select 
              id="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
              required
            >
              <option value="Productivity">Productivity</option>
              <option value="Wellness">Wellness</option>
              <option value="Fitness">Fitness</option>
              <option value="Learning">Learning</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Creativity">Creativity</option>
              <option value="Other">Other</option>
            </select>
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