// src/components/SafeRooms/SafeRoomTabs.js
import styles from './SafeRoomTabs.module.css';

export default function SafeRoomTabs({ activeTab, onChangeTab }) {
  const tabs = [
    { id: 'MY_ROOMS', label: 'MY ROOMS' },
    { id: 'AVAILABLE_ROOMS', label: 'AVAILABLE ROOMS' },
    { id: 'JOIN_ROOM', label: 'JOIN ROOM' },
    { id: 'CREATE_ROOM', label: 'CREATE ROOM' },
  ];
  
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onChangeTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}