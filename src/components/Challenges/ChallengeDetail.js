// src/components/Challenges/ChallengeDetail.js
"use client";

import { useState } from 'react';
import styles from './ChallengeDetail.module.css';

export default function ChallengeDetail({ challenge, onCheckIn }) {
  const [checkInText, setCheckInText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the onCheckIn function with check-in data
    onCheckIn(challenge.id, {
      text: checkInText,
      file: file
    });
    
    // Reset form
    setCheckInText('');
    setFile(null);
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
          {challenge.totalDays} days • {challenge.category.toLowerCase()}
        </div>
        
        {challenge.description && (
          <p className={styles.challengeDescription}>{challenge.description}</p>
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
            style={{ width: `${challenge.progress}%` }}
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
          
          <button type="submit" className={styles.submitButton}>
            Submit Check-in
          </button>
        </form>
      </div>
    </div>
  );
}