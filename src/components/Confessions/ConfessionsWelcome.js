
import { useState, useEffect } from 'react';
import styles from './ConfessionWelcome.module.css';

export default function ConfessionWelcome() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasShown = localStorage.getItem('ConfessionWelcomeShown');
    if (hasShown === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ConfessionWelcomeShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2 className={styles.welcomeTitle}>Welcome to ConfessionForm!</h2>
        <p className={styles.welcomeText}>
        The Confessions page is a space where you can share your thoughts, regrets, secrets, or emotions anonymously — without fear of being judged.. Here you can:
        </p>
        <ul className={styles.featureList}>
          <li><strong>✍️ Write anonymously — no login or identity tracking required.</strong>.</li>
          <li><strong>🧠 Express freely — whether it’s something you’ve never said out loud or a truth that needs space.</strong></li>
          <li><strong>Available Rooms</strong>: Browse and join default public rooms easily.</li>
    
        </ul>
        <p className={styles.highlight}>
          🔒 <strong>This space is about emotional honesty, healing, and freedom — one anonymous voice at a time.

</strong> 
        </p>
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
