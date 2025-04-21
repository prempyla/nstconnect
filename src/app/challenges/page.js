// src/app/challenges/page.js
"use client";

import { useState } from 'react';
import NavBar from "@/components/Navbar";
import ChallengeStreaks from "@/components/Challenges/ChallengeStreaks";
import styles from "./page.module.css";

export default function Challenges() {
  const [activeTab, setActiveTab] = useState('My Challenges');
  
  const tabs = [
    'My Challenges',
    'Available Challenges',
    'Leaderboard',
    'Create Challenge'
  ];
  
  return (
    <main className={styles.main}>
      <NavBar />
      
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
          {activeTab === 'My Challenges' && <ChallengeStreaks />}
          {activeTab === 'Available Challenges' && <div>Available challenges will appear here</div>}
          {activeTab === 'Leaderboard' && <div>Leaderboard will appear here</div>}
          {activeTab === 'Create Challenge' && <div>Create challenge form will appear here</div>}
        </div>
      </div>
    </main>
  );
}