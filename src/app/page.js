import Link from "next/link";
import NavBar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import cardStyles from "@/components/CardStyles.module.css";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>EXPRESS</span>
            <span className={styles.titleLine}>
              DARE
              <span className={styles.circle + " " + styles.pinkCircle}></span>
              CARE
            </span>
            <span className={styles.titleLine}>
              <span className={styles.circle + " " + styles.yellowCircle}></span>
              GROW
              <span className={styles.circle + " " + styles.purpleCircle}></span>
            </span>
          </h1>
          
          <p className={styles.subtitle}>
            (Jump in ↓)
          </p>
          
          <div className={styles.cardGrid}>
            <FeatureCard 
              title="Confessions" 
              actionText="DISCOVER" 
              customClass={cardStyles.lightCard}
            />
            <FeatureCard 
              title="Challenges" 
              actionText="VIEW" 
              customClass={cardStyles.darkCard}
              isActive={true}
            />
            <FeatureCard 
              title="Safe Rooms" 
              actionText="EXPLORE" 
              customClass={cardStyles.lightCard}
            />
          </div>
        </div>
      </div>
    </main>
  );
}