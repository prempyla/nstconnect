"use client";

import { useState } from 'react';
import styles from './ConfessionForm.module.css';

export default function ConfessionForm({ onConfessionSubmitted }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const availableTags = [
    'Love', 'Friendship', 'College', 'Study', 'Stress', 
    'Funny', 'Relationship', 'Family', 'Mental Health', 'Other'
  ];
  
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      setError('Please fill out both title and message fields.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // This would be an API call in production
      // For now, let's simulate an API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Confession submitted:', {
        title,
        message,
        tags: selectedTags
      });
      
      // Clear form
      setTitle('');
      setMessage('');
      setSelectedTags([]);
      setSuccess(true);
      
      // Notify parent component to refresh the feed
      if (onConfessionSubmitted) {
        onConfessionSubmitted();
      }
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting confession:', err);
      setError('Failed to submit confession. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Share Your Confession</h2>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {success && (
        <div className={styles.successMessage}>
          Confession submitted successfully! It will be reviewed shortly.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input 
            type="text"
            id="title"
            className={styles.input}
            placeholder="Give your confession a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            className={styles.textarea}
            placeholder="Share your thoughts anonymously..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Tags (optional, max 3)</label>
          <div className={styles.tagsContainer}>
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.selectedTag : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Post Anonymously'}
        </button>
      </form>
    </div>
  );
}