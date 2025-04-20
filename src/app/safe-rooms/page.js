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
  const [createdRoom, setCreatedRoom] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(null);

  // Function to switch to My Rooms tab and refresh the rooms
  const switchToMyRooms = () => {
    setActiveTab('MY_ROOMS');
    setRefreshRooms(prev => prev + 1); // Increment to trigger useEffect in MyRooms
  };

  // Handle room creation success
  const handleRoomCreated = (room) => {
    setCreatedRoom(room);
    // Don't auto-switch to MyRooms, let user see the room code first
  };

  // Handle entering a created room
  const handleEnterCreatedRoom = () => {
    setCreatedRoom(null);
    switchToMyRooms();
  };

  // Handle room joining success
  const handleRoomJoined = (room) => {
    setJoinedRoom(room);
  };

  // Handle entering a joined room
  const handleEnterJoinedRoom = () => {
    setJoinedRoom(null);
    switchToMyRooms();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'MY_ROOMS':
        return <MyRooms key={refreshRooms} />;
      case 'JOIN_ROOM':
        if (joinedRoom) {
          return (
            <div className={styles.successContainer}>
              <h2 className={styles.successTitle}>Successfully Joined Room!</h2>
              <p className={styles.successMessage}>You have joined the safe room.</p>
              <button 
                className={styles.enterButton}
                onClick={handleEnterJoinedRoom}
              >
                Enter Room
              </button>
            </div>
          );
        }
        return <JoinRoomForm onRoomJoined={handleRoomJoined} />;
      case 'CREATE_ROOM':
      default:
        if (createdRoom) {
          return (
            <div className={styles.successContainer}>
              <h2 className={styles.successTitle}>Room Created Successfully!</h2>
              <p className={styles.successMessage}>Share this code with others to invite them to your room:</p>
              <div className={styles.roomCode}>{createdRoom.roomCode}</div>
              <button 
                className={styles.enterButton}
                onClick={handleEnterCreatedRoom}
              >
                Enter Room
              </button>
            </div>
          );
        }
        return <CreateRoomForm onRoomCreated={handleRoomCreated} />;
    }
  };

  return (
    <main className={styles.main}>
      <NavBar />
      
      <div className={styles.container}>
        <h1 className={styles.title}>SAFE ROOMS</h1>
        
        <SafeRoomTabs activeTab={activeTab} onChangeTab={(tab) => {
          // Reset states when changing tabs
          setCreatedRoom(null);
          setJoinedRoom(null);
          setActiveTab(tab);
          
          // Refresh rooms list when switching to My Rooms
          if (tab === 'MY_ROOMS') {
            setRefreshRooms(prev => prev + 1);
          }
        }} />
        
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </main>
  );
}