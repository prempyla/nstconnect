import { useState } from 'react';
import styles from './ConfessionFeed.module.css';

export default function ConfessionFeed({ confessions, isLoading }) {
  if (isLoading) {
    return <div className={styles.loading}>Loading confessions...</div>;
  }
  
  if (!confessions || confessions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No confessions yet</h3>
        <p>Be the first to share your thoughts anonymously!</p>
      </div>
    );
  }
  
  return (
    <div className={styles.feed}>
      {confessions.map(confession => (
        <ConfessionCard key={confession.id} confession={confession} />
      ))}
    </div>
  );
}

function ConfessionCard({ confession }) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(confession.reactions.upvotes || 0);
  
  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setUpvoted(!upvoted);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{confession.title}</h3>
      </div>
      
      <p className={styles.cardContent}>{confession.content}</p>
      
      {confession.tags && confession.tags.length > 0 && (
        <div className={styles.tags}>
          {confession.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
      
      <div className={styles.cardFooter}>
        <span className={styles.date}>{formatDate(confession.created)}</span>
        
        <div className={styles.reactions}>
          <button 
            className={`${styles.reactionButton} ${upvoted ? styles.upvoted : ''}`}
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span>{upvoteCount}</span>
          </button>
          
          <span className={styles.commentCount}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{confession.reactions.comments}</span>
          </span>
        </div>
      </div>
    </div>
  );
}