"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import ConfessionForm from "@/components/Confessions/ConfessionForm";
import ConfessionFeed from "@/components/Confessions/ConfessionFeed";
import styles from "./page.module.css";

export default function Confessions() {
  const [confessions, setConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recent'); // 'recent' or 'trending'
  
  // Function to refresh the confessions after posting a new one
  const refreshConfessions = () => {
    setIsLoading(true);
    // Simulate API fetch delay
    setTimeout(() => {
      fetchConfessions();
    }, 500);
  };
  
  // Function to fetch confessions
  const fetchConfessions = () => {
    // This would be replaced with actual API call in production
    // Simulating data for now
    const mockConfessions = [
      {
        id: 'conf-001',
        title: 'LOVE',
        content: 'I Think i might love her',
        tags: ['Love', 'Relationships'],
        created: new Date('2025-04-19T14:30:00'),
        reactions: {
          upvotes: 0,
          comments: 0
        }
      },
      {
        id: 'conf-002',
        title: 'Failing My Classes',
        content: "I haven't attended any classes this semester and finals are two weeks away. I don't know how to tell my parents I might fail everything.",
        tags: ['Study', 'Stress'],
        created: new Date('2025-04-18T09:45:00'),
        reactions: {
          upvotes: 12,
          comments: 3
        }
      },
      {
        id: 'conf-003',
        title: 'Secret Crush',
        content: "I've had a crush on my roommate's boyfriend for the entire semester. I feel horrible about it but I can't stop these feelings.",
        tags: ['Love', 'Friendship'],
        created: new Date('2025-04-17T16:20:00'),
        reactions: {
          upvotes: 24,
          comments: 7
        }
      }
    ];
    
    setConfessions(mockConfessions);
    setIsLoading(false);
  };
  
  // Initial fetch on component mount
  useEffect(() => {
    fetchConfessions();
  }, []);
  
  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsLoading(true);
    
    // Simulate API fetch with some delay
    setTimeout(() => {
      // In a real app, we'd fetch different data based on the active tab
      fetchConfessions();
    }, 300);
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