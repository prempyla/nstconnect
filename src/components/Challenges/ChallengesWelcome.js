import { useState, useEffect } from 'react';
import styles from './ChallengesWelcome.module.css';

export default function ChallengesWelcome() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasShown = localStorage.getItem('ChallengesWelcomeShown');
    if (hasShown === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ChallengesWelcomeShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <h2 className={styles.welcomeTitle}>🎯 Challenges – Step Out, Speak Up, Grow Together</h2>
        <p className={styles.welcomeText}>
          The Challenges feature is designed to spark self-discovery, growth, and meaningful conversations through anonymous weekly tasks or prompts. You can:
        </p>
        <ul className={styles.featureList}>
          <li><strong>✅ Take on challenges</strong> that push you to reflect, express, or try something new — anonymously.</li>
          <li><strong>📬 Submit your responses</strong> without revealing your identity.</li>
          <li><strong>🌱 Grow as a community</strong> — in the full version, responses will be viewable anonymously to inspire others.</li>
        </ul>
        <p className={styles.highlight}>
          Whether it’s writing a letter to your future self, admitting a fear, or encouraging a stranger — each challenge is a small step toward vulnerability, connection, and emotional growth.
        </p>
        <p className={styles.note}>
          <strong>Note:</strong> This is a preview version — backend is not yet active, so challenge responses aren't stored yet.
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
