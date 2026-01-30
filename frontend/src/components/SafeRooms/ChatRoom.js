"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import Link from 'next/link';
import styles from './ChatRoom.module.css';
import { safeRoomsAPI } from '@/lib/api';

// Helper to read the anonymous ID cookie
function getAnonId() {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)sr_anonymous_id=([^;]+)/);
  return match ? match[1] : null;
}

export default function ChatRoom({ roomId }) {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const anonId = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch initial messages and room details
  useEffect(() => {
    anonId.current = getAnonId();

    const initRoom = async () => {
      try {
        const [roomResponse, msgsResponse] = await Promise.all([
          safeRoomsAPI.getRoomById(roomId),
          safeRoomsAPI.getMessages(roomId)
        ]);
        
        setRoomDetails(roomResponse.room);
        setMessages(msgsResponse.messages || []);
        setLoading(false);
      } catch (err) {
        console.error('Error initializing room:', err);
        setError('Failed to load room. Make sure you have joined this room.');
        setLoading(false);
      }
    };

    initRoom();
  }, [roomId]);

  // Socket.IO connection
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const newSocket = io(socketUrl, {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('room:join', {
        roomId,
        anonymousId: anonId.current,
      });
    });

    newSocket.on('message:receive', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('presence:update', ({ count }) => {
      setOnlineCount(count);
    });

    newSocket.on('typing:start', ({ userId }) => {
      setTypingUsers((prev) => new Set([...prev, userId]));
    });

    newSocket.on('typing:stop', ({ userId }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    });

    newSocket.on('room:join:error', (err) => {
      console.error('Room join error:', err);
      setError(err.message || 'Could not join room.');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    socket.emit('message:send', {
      roomId,
      text: newMessage.trim(), // backend expects 'text' not 'content'
      anonymousId: anonId.current,
    });

    setNewMessage('');

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit('typing:stop', { roomId, anonymousId: anonId.current });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (socket) {
      socket.emit('typing:start', { roomId, anonymousId: anonId.current });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing:stop', { roomId, anonymousId: anonId.current });
      }, 1500);
    }
  };

  const handleLeaveRoom = async () => {
    if (confirm("Are you sure you want to leave this safe room?")) {
      try {
        await safeRoomsAPI.leaveRoom(roomId);
        router.push('/safe-rooms');
      } catch (err) {
        alert("Failed to leave room.");
      }
    }
  };

  const handleFlagMessage = async (msgId) => {
    try {
      await safeRoomsAPI.flagMessage(msgId, "Inappropriate content");
      alert("Message reported anonymously for safety.");
      setActiveMessageMenu(null);
    } catch (err) {
      alert("Failed to report message.");
    }
  };

  const handleBanUser = async (targetUserId) => {
    if (confirm("Ban this anonymous user from the room?")) {
      try {
        await safeRoomsAPI.banUser(roomId, targetUserId);
        alert("User banned successfully.");
        setActiveMessageMenu(null);
      } catch (err) {
        alert("Failed to ban user.");
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading chat...</div>;
  if (error)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error}</div>
        <Link href="/safe-rooms" className={styles.backLink}>
          ← Back to Safe Rooms
        </Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/safe-rooms" className={styles.backButton}>
            ←
          </Link>
          <div className={styles.roomInfo}>
            <h2>{roomDetails?.name || 'Safe Room'}</h2>
            <div className={styles.subInfo}>
              <span className={styles.onlineCount}>{onlineCount} online</span>
              {roomDetails?.joinCode && (
                <span className={styles.joinCode}>
                  Code: <strong>{roomDetails.joinCode}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button onClick={handleLeaveRoom} className={styles.leaveButton}>
            Leave Room
          </button>
        </div>
      </div>

      <div className={styles.messageList}>
        {messages.length === 0 && (
          <div className={styles.emptyMessages}>
            No messages yet. Be the first to say something!
          </div>
        )}
        {messages.map((msg) => {
          const isOwn = msg.userId === anonId.current;
          return (
            <div
              key={msg.id}
              className={`${styles.message} ${isOwn ? styles.ownMessage : styles.otherMessage}`}
            >
              <div className={styles.messageContent}>
                <div className={styles.content}>{msg.text}</div>
                <div className={styles.msgFooter}>
                  <div className={styles.time}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  {!isOwn && (
                    <div className={styles.msgActions}>
                      <button 
                        className={styles.dotsButton}
                        onClick={() => setActiveMessageMenu(activeMessageMenu === msg.id ? null : msg.id)}
                      >
                        ⋮
                      </button>
                      {activeMessageMenu === msg.id && (
                        <div className={styles.menuDropdown}>
                          <button onClick={() => handleFlagMessage(msg.id)}>🚨 Report</button>
                          {roomDetails?.isOwner && (
                            <button onClick={() => handleBanUser(msg.userId)}>🔨 Ban User</button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {typingUsers.size > 0 && (
        <div className={styles.typingIndicator}>
          {typingUsers.size === 1 ? 'Someone is' : `${typingUsers.size} people are`} typing...
        </div>
      )}

      <form onSubmit={handleSendMessage} className={styles.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          className={styles.input}
          autoComplete="off"
        />
        <button type="submit" className={styles.sendButton} disabled={!newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
