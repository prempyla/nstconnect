"use client";

import { useState } from 'react';
import styles from './MyChallengesList.module.css';
import CheckInModal from './CheckInModal';
import { challengesAPI } from '@/lib/api';

export default function MyChallengesList({ publicChallenges = [], privateChallenges = [], onCheckIn, onDelete }) {
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [showCheckInModal, setShowCheckInModal] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'public', 'private'

    const handleCheckInClick = (challenge) => {
        setSelectedChallenge(challenge);
        setShowCheckInModal(true);
    };

    const handleCheckInSubmit = async (checkInData) => {
        if (onCheckIn) {
            await onCheckIn(selectedChallenge.id, checkInData);
        }
        setShowCheckInModal(false);
        setSelectedChallenge(null);
    };

    const handleDelete = async (challengeId) => {
        if (window.confirm("Are you sure you want to delete this challenge? This action cannot be undone.")) {
            try {
                await challengesAPI.delete(challengeId);
                // Notify parent to refresh instead of reloading the page
                if (onDelete) {
                    await onDelete(challengeId);
                }
            } catch (error) {
                console.error("Failed to delete challenge:", error);
                alert("Failed to delete challenge. Please try again.");
            }
        }
    };

    const ChallengeCard = ({ challenge }) => {
        const canCheckInToday = () => {
            if (!challenge.lastCheckIn) return true;
            const lastCheckIn = new Date(challenge.lastCheckIn);
            const today = new Date();
            lastCheckIn.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            return lastCheckIn.getTime() !== today.getTime();
        };

        return (
            <div className={styles.challengeCard}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                    <span className={styles.streakBadge}>
                        {challenge.currentDay}/{challenge.totalDays}
                    </span>
                </div>

                <p className={styles.challengePrompt}>{challenge.prompt}</p>

                <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${challenge.progress}%` }}
                        />
                    </div>
                    <span className={styles.progressText}>{challenge.progress}% Complete</span>
                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.participants}>
                        {challenge.participants} participant{challenge.participants !== 1 ? 's' : ''}
                    </span>
                    <button
                        className={styles.checkInButton}
                        onClick={() => handleCheckInClick(challenge)}
                        disabled={!canCheckInToday()}
                    >
                        {canCheckInToday() ? 'Check In' : 'Checked In Today ✓'}
                    </button>
                    {challenge.isCreator && (
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(challenge.id)}
                            style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // Filter challenges based on selected tab
    const getFilteredChallenges = () => {
        if (filter === 'public') return { public: publicChallenges, private: [] };
        if (filter === 'private') return { public: [], private: privateChallenges };
        return { public: publicChallenges, private: privateChallenges }; // 'all'
    };

    const filtered = getFilteredChallenges();
    const hasAnyChallenges = publicChallenges.length > 0 || privateChallenges.length > 0;

    return (
        <div className={styles.container}>
            {hasAnyChallenges && (
                <div className={styles.filterTabs}>
                    <button
                        className={`${styles.filterTab} ${filter === 'all' ? styles.activeFilter : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({publicChallenges.length + privateChallenges.length})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'public' ? styles.activeFilter : ''}`}
                        onClick={() => setFilter('public')}
                    >
                        Public ({publicChallenges.length})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filter === 'private' ? styles.activeFilter : ''}`}
                        onClick={() => setFilter('private')}
                    >
                        Private ({privateChallenges.length})
                    </button>
                </div>
            )}

            {filtered.public.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Public Challenges</h2>
                    <div className={styles.challengeGrid}>
                        {filtered.public.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </div>
            )}

            {filtered.private.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Private Challenges</h2>
                    <div className={styles.challengeGrid}>
                        {filtered.private.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                </div>
            )}

            {!hasAnyChallenges && (
                <div className={styles.emptyState}>
                    <p>You don&apos;t have any active challenges yet.</p>
                    <p>Join a challenge from the Available Challenges tab or create your own!</p>
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
