"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import ChallengeDetail from "@/components/Challenges/ChallengeDetail";
import CreateChallengeForm from "@/components/Challenges/CreateChallengeForm";
import AvailableChallenges from "@/components/Challenges/AvailableChallenges";
import ChallengesWelcome from '@/components/Challenges/ChallengesWelcome';
// import Leaderboard from "@/components/Challenges/Leaderboard";
import styles from "./page.module.css";

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('My Challenges');
  const [challenges, setChallenges] = useState([
    {
      id: 'c1',
      title: 'Coding Challenge',
      category: 'Productivity',
      description: 'Should solve coding question daily',
      currentDay: 2,
      totalDays: 30,
      progress: 7,
      lastCompleted: new Date()
    }
  ]);
  
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasShown = localStorage.getItem('ChallengesWelcomeShown');
      setShowWelcome(wasShown !== 'true');
    }
  }, []);

  const tabs = [
    'My Challenges',
    'Available Challenges',
    'Leaderboard',
    'Create Challenge'
  ];

  const handleChallengeCreated = (newChallenge) => {
    const challengeWithDefaults = {
      ...newChallenge,
      currentDay: 1,
      progress: 3,
      lastCompleted: null
    };
    
    setChallenges([...challenges, challengeWithDefaults]);
    setActiveTab('My Challenges');
    setSelectedChallenge(challengeWithDefaults);
  };

  return (
    <main className={styles.main}>
      <NavBar />

      {/* Welcome Note - Show only if needed */}
      {showWelcome && <ChallengesWelcome />}

      <div className={styles.container}>
        <h1 className={styles.title}>Challenge Streaks</h1>

        <div className={styles.tabs}>
          {tabs.map(tab => (
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
            challenges.length > 0 ? (
              <ChallengeDetail 
                challenge={selectedChallenge} 
                onCheckIn={(challengeId, checkInData) => {
                  setChallenges(challenges.map(c => 
                    c.id === challengeId 
                      ? { 
                          ...c, 
                          currentDay: c.currentDay + 1, 
                          progress: Math.round((c.currentDay + 1) / c.totalDays * 100),
                          lastCompleted: new Date() 
                        }
                      : c
                  ));
                }}
              />
            ) : (
              <div className={styles.emptyState}>
                <p>You Don&apos;t have any active challenges yet.</p>
                <button 
                  className={styles.startButton}
                  onClick={() => setActiveTab('Create Challenge')}
                >
                  Create Your First Challenge
                </button>
              </div>
            )
          )}
          {activeTab === 'Available Challenges' && <AvailableChallenges />}
          {/* {activeTab === 'Leaderboard' && <Leaderboard />} */}
          {activeTab === 'Create Challenge' && <CreateChallengeForm onChallengeCreated={handleChallengeCreated} />}
        </div>
      </div>
    </main>
  );
}
