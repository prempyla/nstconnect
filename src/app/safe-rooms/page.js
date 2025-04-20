"use client";

import { useState } from 'react';
import NavBar from "@/components/SafeRooms/NavBar";
import styles from "./page.module.css";
import SafeRoomTabs from "@/components/SafeRooms/SafeRoomTabs";
import CreateRoomForm from "@/components/SafeRooms/CreateRoomForm";
import JoinRoomForm from "@/components/SafeRooms/JoinRoomForm";
import MyRooms from "@/components/SafeRooms/MyRooms";

export default function SafeRooms() {
  const [activeTab, setActiveTab] = useState('CREATE_ROOM');

  const renderContent = () => {
    switch (activeTab) {
      case 'MY_ROOMS':
        return <MyRooms />;
      case 'JOIN_ROOM':
        return <JoinRoomForm />;
      case 'CREATE_ROOM':
      default:
        return <CreateRoomForm />;
    }
  };

  return (
    <main className={styles.main}>
      <NavBar />
      
      <div className={styles.container}>
        <h1 className={styles.title}>SAFE ROOMS</h1>
        
        <SafeRoomTabs activeTab={activeTab} onChangeTab={setActiveTab} />
        
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </main>
  );
}