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
    
    try {
      // Mock challenge creation
      const newChallenge = {
        id: 'c' + Date.now(),
        title,
        description,
        category,
        duration,
        streak: 0,
        totalDays: duration,
        startDate: new Date(),
        color: getColorForCategory(category)
      };
      
      // Wait a bit to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Notify parent component
      if (onChallengeCreated) {
        onChallengeCreated(newChallenge);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('Productivity');
      setDuration(30);
    } catch (err) {
      setError('Error creating challenge. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to get color based on category
  const getColorForCategory = (cat) => {
    const colorMap = {
      'Productivity': 'var(--purple-light)',
      'Wellness': 'var(--pink-light)',
      'Fitness': 'var(--yellow-light)',
      'Learning': 'var(--purple-light)',
      'Personal Growth': 'var(--pink-light)',
      'Creativity': 'var(--yellow-light)',
      'Other': 'var(--purple-light)'
    };
    
    return colorMap[cat] || 'var(--purple-light)';
  };

  return (
    <div>
      <h2 className={styles.formTitle}>Create a New Challenge</h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="challenge-title" className={styles.label}>Challenge Title</label>
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
          <label htmlFor="category" className={styles.label}>Category</label>
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
        
        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.label}>Duration (days)</label>
          <input
            id="duration"
            type="number"
            min="1"
            max="365"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the challenge and its rules..."
            className={styles.textarea}
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Challenge'}
        </button>
      </form>
    </div>
  );
}