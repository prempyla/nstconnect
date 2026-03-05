"use client";

import { useState, useEffect } from 'react';
import { challengesAPI } from '@/lib/api';
import styles from './Leaderboard.module.css';

export default function Leaderboard() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await challengesAPI.getAll();
      // Sort by participants descending
      const sorted = [...data].sort((a, b) => (b.participants || 0) - (a.participants || 0));
      setChallenges(sorted);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading leaderboard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (challenges.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No challenges yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🏆 Community Leaderboard</h2>
        <p className={styles.subtitle}>Top challenges by participation</p>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.rank}>Rank</span>
          <span className={styles.challengeName}>Challenge</span>
          <span className={styles.participants}>Participants</span>
          <span className={styles.duration}>Duration</span>
        </div>

        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            className={`${styles.row} ${index < 3 ? styles[`top${index + 1}`] : ''}`}
          >
            <span className={styles.rank}>
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </span>
            <div className={styles.challengeInfo}>
              <span className={styles.challengeTitle}>{challenge.title}</span>
              <span className={styles.challengePrompt}>{challenge.prompt}</span>
            </div>
            <span className={styles.participants}>
              {challenge.participants || 0} joined
            </span>
            <span className={styles.duration}>
              {challenge.totalDays || 30} days
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
