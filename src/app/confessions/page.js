"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import ConfessionForm from "@/components/Confessions/ConfessionForm";
import ConfessionFeed from "@/components/Confessions/ConfessionFeed";
import styles from "./page.module.css";
import { getConfessions } from '@/lib/pocketbase'; // Import the new function

export default function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recent'); // 'recent' or 'trending'
  
  // Function to refresh the confessions after posting a new one
  const refreshConfessions = () => {
    setIsLoading(true);
    fetchConfessions(activeTab);
  };
  
  // Function to fetch confessions
  const fetchConfessions = async (sortType = 'recent') => {
    try {
      // Use the new function to fetch confessions based on sort type
      const fetchedConfessions = await getConfessions(sortType);
      setConfessions(fetchedConfessions);
    } catch (error) {
      console.error("Error fetching confessions:", error);
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