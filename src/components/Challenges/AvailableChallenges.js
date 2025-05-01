// src/components/Challenges/AvailableChallenges.js
"use client";

import styles from './AvailableChallenges.module.css';

export default function AvailableChallenges() {
  const availableChallenges = [
    {
      id: 'ac1',
      title: 'Morning Meditation',
      category: 'Wellness',
      duration: 21,
      description: 'Start your day with mindfulness',
      participants: 128
    },
    {
      id: 'ac2',
      title: '5K Running',
      category: 'Fitness',
      duration: 30,
      description: 'Train to run a 5K in 30 days',
      participants: 243
    },
    {
      id: 'ac3',
      title: 'Daily Gratitude',
      category: 'Personal Growth',
      duration: 30,
      description: "Write down three things you're grateful for every day",

    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.sectionTitle}>Available Challenges</h2>
        <p className={styles.sectionDescription}>
          Join community challenges and compete with others
        </p>
      </div>

      <div className={styles.challengeGrid}>
        {availableChallenges.map(challenge => (
          <div key={challenge.id} className={styles.challengeCard}>
            <div className={styles.cardHeader}>
              <span className={styles.categoryBadge}>{challenge.category}</span>
              <span className={styles.participantCount}>
                {challenge.participants} participants
              </span>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.challengeTitle}>{challenge.title}</h3>
              <p className={styles.challengeDescription}>{challenge.description}</p>
              <div className={styles.challengeDuration}>{challenge.duration} days</div>
            </div>
            
            <button className={styles.joinButton}>Join Challenge</button>
          </div>
        ))}
      </div>
    </div>
  );
}