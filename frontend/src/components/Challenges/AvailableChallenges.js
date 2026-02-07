// src/components/Challenges/AvailableChallenges.js
"use client";

import { useState, useEffect } from 'react';
import styles from './AvailableChallenges.module.css';
import { challengesAPI } from '@/lib/api';
import CheckInModal from './CheckInModal';

export default function AvailableChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const data = await challengesAPI.getAll();
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (challengeId) => {
    setJoiningId(challengeId);
    try {
      await challengesAPI.join(challengeId);
      // Refresh challenges to update participation status
      await fetchChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge. Please try again.');
    } finally {
      setJoiningId(null);
    }
  };

  const handleCheckInClick = (challenge) => {
    setSelectedChallenge(challenge);
    setShowCheckInModal(true);
  };

  const handleCheckInSubmit = async (checkInData) => {
    try {
      await challengesAPI.complete(selectedChallenge.id, checkInData);
      setShowCheckInModal(false);
      setSelectedChallenge(null);
      // Refresh challenges to update streak
      await fetchChallenges();
    } catch (error) {
      console.error('Error submitting check-in:', error);
      throw error;
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading challenges...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.sectionTitle}>Available Challenges</h2>
        <p className={styles.sectionDescription}>
          Join community challenges and compete with others
        </p>
      </div>

      {challenges.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No public challenges available yet. Create one!</p>
        </div>
      ) : (
        <div className={styles.challengeGrid}>
          {challenges.map(challenge => (
            <div key={challenge.id} className={styles.challengeCard}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryBadge}>Challenge</span>
                <span className={styles.streakBadge}>
                  {challenge.currentDay || 0}/{challenge.totalDays || 30}
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                <p className={styles.challengeDescription}>{challenge.prompt}</p>

                <div className={styles.participantInfo}>
                  <span className={styles.participantCount}>
                    {challenge.participants} participant{challenge.participants !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <button
                className={styles.joinButton}
                onClick={() => handleJoin(challenge.id)}
                disabled={joiningId === challenge.id}
              >
                {joiningId === challenge.id ? 'Joining...' : 'Join Challenge'}
              </button>
            </div>
          ))}
        </div>
      )}

      {showCheckInModal && selectedChallenge && (
        <CheckInModal
          challenge={selectedChallenge}
          onSubmit={handleCheckInSubmit}
          onClose={() => {
            setShowCheckInModal(false);
            setSelectedChallenge(null);
          }}
        />
      )}
    </div>
  );
}