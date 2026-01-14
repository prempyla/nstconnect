"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import ConfessionForm from "@/components/Confessions/ConfessionForm";
import ConfessionFeed from "@/components/Confessions/ConfessionFeed";
import styles from "./page.module.css";
import { confessionsAPI } from '@/lib/api';
import ConfessionWelcome from '@/components/Confessions/ConfessionsWelcome';

export default function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recent'); // 'recent' or 'trending'
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasShown = localStorage.getItem('ConfessionsWelcomeShown');
      setShowWelcome(wasShown !== 'true');
    }
  }, [activeTab]);
  // Function to refresh the confessions after posting a new one
  const refreshConfessions = () => {
    setIsLoading(true);
    fetchConfessions(activeTab);
  };

  // Function to fetch confessions
  // In src/app/confessions/page.js
  // Add this to the fetchConfessions function

  const fetchConfessions = async (sortType = 'recent') => {
    try {
      console.log("Fetching confessions with sort type:", sortType);
      // Use the new API to fetch confessions
      const response = await confessionsAPI.getAll();
      console.log("Fetched confessions:", response);
      // Backend returns array directly
      setConfessions(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching confessions:", error);
      setConfessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchConfessions(activeTab);
  }, []);

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsLoading(true);
    fetchConfessions(tab);
  };

  return (
    <main className={styles.main}>
      <NavBar />

      <div className={styles.container}>
        <h1 className={styles.title}>Confessions Forum</h1>
        {showWelcome && <ConfessionWelcome />}

        <ConfessionForm onConfessionSubmitted={refreshConfessions} />

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'recent' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('recent')}
          >
            Recent
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'trending' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('trending')}
          >
            Trending This Week
          </button>
        </div>

        <ConfessionFeed
          confessions={confessions}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}