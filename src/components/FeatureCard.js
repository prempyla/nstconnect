import Link from "next/link";
import styles from './FeatureCard.module.css';

export default function FeatureCard({ title, actionText, customClass, isActive = false }) {
  const href = `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  ;
;
  
  return (
    <Link 
      href={href}
      className={`${styles.card} ${customClass} ${isActive ? styles.active : ''}`}
    >
      <div className={styles.actionText}>
        {actionText}
      </div>
      
      <div className={styles.title}>
        {title}
      </div>
      
      <div className={styles.arrow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}