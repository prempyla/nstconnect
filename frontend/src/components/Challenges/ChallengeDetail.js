// src/components/Challenges/ChallengeDetail.js
"use client";

import { useState } from 'react';
import styles from './ChallengeDetail.module.css';
import { challengesAPI } from '@/lib/api';

export default function ChallengeDetail({ challenge, onCheckIn }) {
  const [checkInText, setCheckInText] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInText.trim()) {
      setError('Please write something about your progress today');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call the API to submit check-in
      await challengesAPI.complete(challenge.id, {
        text: checkInText.trim()
      });

      setSuccess(true);

      // Notify parent to refresh challenge data
      if (onCheckIn) {
        onCheckIn(challenge.id, { text: checkInText });
      }

      // Reset form
      setCheckInText('');
      setFile(null);

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Check-in error:', err);
      setError(err.message || 'Failed to submit check-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  if (!challenge) {
    return <div className={styles.noChallenge}>Select a challenge to view details</div>;
  }

  return (
    <div className={styles.challengeDetail}>
      <div className={styles.challengeHeader}>
        <h2 className={styles.challengeTitle}>{challenge.title}</h2>
        <div className={styles.challengeMeta}>
          {challenge.totalDays} days
        </div>

        {challenge.prompt && (
          <p className={styles.challengeDescription}>{challenge.prompt}</p>
        )}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span>Progress: Day {challenge.currentDay} of {challenge.totalDays}</span>
          <span className={styles.progressPercentage}>{challenge.progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${challenge.progress}% ` }}
          ></div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.checkInButton}>Check In Today</button>
        <button className={styles.viewProgressButton}>View Progress</button>
        <button className={styles.quitButton}>Quit Challenge</button>
      </div>

      <div className={styles.checkInSection}>
        <h3 className={styles.checkInTitle}>Daily Check-in</h3>

        {error && (
          <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage} style={{ color: 'green', marginBottom: '10px' }}>
            ✅ Check-in submitted successfully! Keep up the great work!
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.checkInForm}>
          <textarea
            className={styles.checkInTextarea}
            placeholder="Describe what you did today for this challenge..."
            value={checkInText}
            onChange={(e) => setCheckInText(e.target.value)}
          ></textarea>

          <div className={styles.fileUploadSection}>
            <p className={styles.uploadLabel}>Or upload a proof (image or text file)</p>
            <div className={styles.fileInputContainer}>
              <label htmlFor="proofFile" className={styles.fileInputLabel}>
                Choose file
              </label>
              <input
                type="file"
                id="proofFile"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <span className={styles.fileName}>
                {file ? file.name : 'No file chosen'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Check-in'}
          </button>
        </form>
      </div>
    </div>
  );
}