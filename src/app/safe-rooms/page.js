"use client";

import { useState, useEffect } from 'react';
import NavBar from "@/components/Navbar";
import styles from "./page.module.css";
import SafeRoomTabs from "@/components/SafeRooms/SafeRoomTabs";
import CreateRoomForm from "@/components/SafeRooms/CreateRoomForm";
import JoinRoomForm from "@/components/SafeRooms/JoinRoomForm";
import MyRooms from "@/components/SafeRooms/MyRooms";

export default function SafeRooms() {
  const [activeTab, setActiveTab] = useState('CREATE_ROOM');
  const [refreshRooms, setRefreshRooms] = useState(0);

  // Function to switch to My Rooms tab and refresh the rooms
  const switchToMyRooms = () => {
    setActiveTab('MY_ROOMS');
    setRefreshRooms(prev => prev + 1); // Increment to trigger useEffect in MyRooms
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'MY_ROOMS':
        return <MyRooms key={refreshRooms} />;
      case 'JOIN_ROOM':
        return <JoinRoomForm onRoomJoined={switchToMyRooms} />;
      case 'CREATE_ROOM':
      default:
        return <CreateRoomForm onRoomCreated={() => {
          // You could also add auto-switching to My Rooms after room creation
          // by uncommenting this line
          // switchToMyRooms();
        }} />;
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