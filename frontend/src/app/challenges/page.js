"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import MyChallengesList from "@/components/Challenges/MyChallengesList";
import CreateChallengeForm from "@/components/Challenges/CreateChallengeForm";
import AvailableChallenges from "@/components/Challenges/AvailableChallenges";
import Leaderboard from "@/components/Challenges/Leaderboard";
import ChallengesWelcome from '@/components/Challenges/ChallengesWelcome';
import styles from "./page.module.css";
import { challengesAPI } from '@/lib/api';

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('My Challenges');
  const [publicChallenges, setPublicChallenges] = useState([]);
  const [privateChallenges, setPrivateChallenges] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasShown = localStorage.getItem('ChallengesWelcomeShown');
      setShowWelcome(wasShown !== 'true');
    }
    fetchMyChallenges();
  }, []);

  const fetchMyChallenges = async () => {
    try {
      setLoading(true);
      const data = await challengesAPI.getMyChallenges();
      setPublicChallenges(data.publicChallenges || []);
      setPrivateChallenges(data.privateChallenges || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    'My Challenges',
    'Available Challenges',
    'Leaderboard',
    'Create Challenge',
  ];

  const handleChallengeCreated = async () => {
    await fetchMyChallenges();
    setActiveTab('My Challenges');
  };

  const handleCheckIn = async () => {
    await fetchMyChallenges();
  };

  const handleDelete = async () => {
    await fetchMyChallenges();
  };

  return (
    <main className={styles.main}>
      <NavBar />

      {showWelcome && <ChallengesWelcome />}

      <div className={styles.container}>
        <h1 className={styles.title}>Challenge Streaks</h1>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === 'My Challenges' && (
            loading ? (
              <div className={styles.loading}>Loading your challenges...</div>
            ) : (
              <MyChallengesList
                publicChallenges={publicChallenges}
                privateChallenges={privateChallenges}
                onCheckIn={handleCheckIn}
                onDelete={handleDelete}
              />
            )
          )}
          {activeTab === 'Available Challenges' && <AvailableChallenges />}
          {activeTab === 'Leaderboard' && <Leaderboard />}
          {activeTab === 'Create Challenge' && (
            <CreateChallengeForm onChallengeCreated={handleChallengeCreated} />
          )}
        </div>
      </div>
    </main>
  );
}
