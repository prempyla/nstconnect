// src/lib/pocketbase.js
import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('http://127.0.0.1:8090'); // Change this to your production URL later

// Helper functions for Safe Rooms feature
export async function createSafeRoom(roomData) {
  try {
    const roomCode = generateRandomCode(8); // Generate a unique code
    
    const data = {
      name: roomData.name,
      category: roomData.category,
      description: roomData.description || '',
      creatorId: pb.authStore.model?.id, // Make sure user is authenticated
      roomCode: roomCode,
      isTemporary: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    };
    
    const record = await pb.collection('safeRooms').create(data);
    
    // Also add creator as a member
    await pb.collection('roomMembers').create({
      roomId: record.id,
      userId: pb.authStore.model.id,
      anonymousName: generateAnonymousName()
    });
    
    return record;
  } catch (error) {
    console.error('Error creating safe room:', error);
    throw error;
  }
}

export async function joinSafeRoom(roomCode) {
  try {
    // Find room by code
    const record = await pb.collection('safeRooms').getFirstListItem(`roomCode="${roomCode}"`);
    
    if (!record) throw new Error('Room not found');
    
    // Check if user is already a member
    const existingMember = await pb.collection('roomMembers').getFirstListItem(
      `roomId="${record.id}" && userId="${pb.authStore.model.id}"`
    ).catch(() => null);
    
    if (!existingMember) {
      // Add user as a member
      await pb.collection('roomMembers').create({
        roomId: record.id,
        userId: pb.authStore.model.id,
        anonymousName: generateAnonymousName()
      });
    }
    
    return record;
  } catch (error) {
    console.error('Error joining safe room:', error);
    throw error;
  }
}

export async function getMySafeRooms() {
  try {
    const memberships = await pb.collection('roomMembers').getFullList({
      filter: `userId="${pb.authStore.model?.id}"`,
      expand: 'roomId'
    });
    
    return memberships.map(m => m.expand.roomId);
  } catch (error) {
    console.error('Error fetching safe rooms:', error);
    throw error;
  }
}

// Utility functions
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateAnonymousName() {
  const adjectives = ['Happy', 'Calm', 'Brave', 'Wise', 'Kind', 'Gentle', 'Quiet', 'Bold'];
  const animals = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Wolf', 'Owl', 'Fox', 'Bear'];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  
  return `${randomAdjective}${randomAnimal}`;
}

export default pb;