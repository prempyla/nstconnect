import styles from './ConfessionFeed.module.css';
import { confessionsAPI } from '@/lib/api';

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
        <h3 className={styles.cardTitle}>Anonymous Confession</h3>
      </div>

      <p className={styles.cardContent}>{confession.content}</p>

      {confession.author_name && (
        <div className={styles.author}>
          <span className={styles.authorName}>By: {confession.author_name}</span>
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.date}>{formatDate(confession.created_at)}</span>
      </div>
    </div>
  );
}