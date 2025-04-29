// src/components/SafeRooms/SafeRoomWelcome.js
import { useState, useEffect } from 'react';
import styles from './SafeRoomsWelcome.module.css';

export default function SafeRoomWelcome() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasShown = localStorage.getItem('safeRoomWelcomeShown');
    if (hasShown === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('safeRoomWelcomeShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2 className={styles.welcomeTitle}>Welcome to Safe Rooms!</h2>
        <p className={styles.welcomeText}>
          Safe Rooms are anonymous, topic-based spaces designed to help people open up, be vulnerable, and support each other — without fear of judgment. Here you can:
        </p>
        <ul className={styles.featureList}>
          <li><strong>Create a Room</strong>: Set up a room as <strong>Public</strong> (visible to everyone) or <strong>Private</strong> (join only with a code).</li>
          <li><strong>Join a Room</strong>: Use a room code or explore public rooms in the <strong>Available Rooms</strong> section.</li>
          <li><strong>Available Rooms</strong>: Browse and join default public rooms easily.</li>
          <li><strong>My Rooms</strong>: Quickly access rooms you have created or joined.</li>
        </ul>
        <p className={styles.highlight}>
          🔒 <strong>Your identity stays anonymous.</strong> 💬 <strong>Your conversations stay real and safe.</strong>
        </p>

        <div className={styles.noteWarning}>
          <p>
            ⚠️ <strong>Note</strong>: This is an early preview of the Safe Rooms feature. The backend integration (chat system) is not yet initiated — so live conversations are not available currently. But this is how the feature will work once fully launched!
          </p>
        </div>

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
