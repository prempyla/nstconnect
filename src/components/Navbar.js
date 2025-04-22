import Link from "next/link";
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoCircle}></div>
          <div className={styles.logoText}>NST Connect</div>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/confessions" className={styles.navLink}>
            CONFESSIONS
          </Link>
          <Link href="/challenges" className={styles.navLink}>
            CHALLENGES
          </Link>
          <Link href="/safe-rooms" className={styles.navLink}>
            SAFE ROOMS
          </Link>
        </div>
        
        <Link href="/signup" className={styles.signupButton}>
          SIGN UP
        </Link>
      </div>
    </nav>
  );
}