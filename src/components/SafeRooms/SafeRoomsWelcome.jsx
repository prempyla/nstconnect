// src/components/SafeRooms/SafeRoomWelcome.js
import { useState } from 'react';
import styles from './SafeRoomsWelcome.module.css';

export default function SafeRoomWelcome() {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store in localStorage to remember user dismissed it
    localStorage.setItem('safeRoomWelcomeShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2 className={styles.welcomeTitle}>Welcome to Safe Rooms!</h2>
        <p className={styles.welcomeText}>
          Safe Rooms provide a secure space for open conversations. Here you can:
        </p>
        <ul className={styles.featureList}>
          <li>Create your own private or public rooms</li>
          <li>Join existing rooms using a room code</li>
          <li>Browse available public rooms</li>
          <li>Connect with others in a safe environment</li>
        </ul>
        <button 
          className={styles.dismissButton}
          onClick={handleDismiss}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}