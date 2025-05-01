// src/components/Challenges/ChallengeStreaks.js
"use client";

import { useState } from 'react';
import styles from './ChallengeStreaks.module.css';

export default function ChallengeStreaks({ challenges = [] }) {
  const [loading, setLoading] = useState(false);
  
  if (loading) {
    return <div className={styles.loading}>Loading your challenges...</div>;
  }
  
  if (challenges.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>You don't have any active challenges yet.</p>
        <p>Go to the "Create Challenge" tab to start a new challenge!</p>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.statsContainer}>
        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Active Challenges</h3>
          <div className={styles.statsValue}>{challenges.length}</div>
        </div>
        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Longest Streak</h3>
          <div className={styles.statsValue}>
            {Math.max(...challenges.map(c => c.streak))}
          </div>
        </div>
        <div className={styles.statsCard}>
          <h3 className={styles.statsTitle}>Total Days</h3>
          <div className={styles.statsValue}>
            {challenges.reduce((sum, c) => sum + c.streak, 0)}
          </div>
        </div>
      </div>
      
      <div className={styles.challengeList}>
        {challenges.map(challenge => (
          <div key={challenge.id} className={styles.challengeCard}>
            <div className={styles.challengeHeader} style={{backgroundColor: challenge.color}}>
              <div className={styles.category}>{challenge.category}</div>
              <div className={styles.streakContainer}>
                <div className={styles.streakValue}>{challenge.streak}</div>
                <div className={styles.streakLabel}>day streak</div>
              </div>
            </div>
            
            <div className={styles.challengeContent}>
              <h3 className={styles.challengeTitle}>{challenge.title}</h3>
              
              <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>
                  {challenge.streak} / {challenge.totalDays} days
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{width: `${(challenge.streak / challenge.totalDays) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className={styles.actions}>
                <button className={styles.actionButton}>Check In</button>
                <div className={styles.lastCompleted}>
                  Last: {formatDate(challenge.lastCompleted)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to format date
function formatDate(date) {
  if (!date) return 'Never';
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}