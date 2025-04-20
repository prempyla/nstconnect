// src/lib/pocketbase.js
import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('http://127.0.0.1:8090'); // Change this to your production URL later

// Mock data storage when PocketBase is unavailable
let mockRooms = [];
let mockMembers = [];

// Helper functions for Safe Rooms feature
export async function createSafeRoom(roomData) {
  try {
    const roomCode = generateRandomCode(8); // Generate a unique code
    
    const data = {
      name: roomData.name,
      category: roomData.category,
      description: roomData.description || '',
      creatorId: pb.authStore.model?.id || 'mock-user-id', // Fallback to mock ID
      roomCode: roomCode,
      isTemporary: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      created: new Date(),
      memberCount: 1, // Start with 1 member (the creator)
      lastActivity: new Date()
    };
    
    let record;
    
    try {
      // Try to create in PocketBase
      record = await pb.collection('safeRooms').create(data);
      
      // Also add creator as a member
      await pb.collection('roomMembers').create({
        roomId: record.id,
        userId: pb.authStore.model?.id || 'mock-user-id',
        anonymousName: generateAnonymousName()
      });
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Create mock data instead
      const mockRoom = {
        ...data,
        id: 'mock-room-' + Date.now(),
      };
      
      mockRooms.push(mockRoom);
      
      mockMembers.push({
        id: 'mock-member-' + Date.now(),
        roomId: mockRoom.id,
        userId: 'mock-user-id',
        anonymousName: generateAnonymousName()
      });
      
      record = mockRoom;
    }
    
    return record;
  } catch (error) {
    console.error('Error creating safe room:', error);
    throw error;
  }
}

export async function joinSafeRoom(roomCode) {
  try {
    let record;
    
    try {
      // Find room by code in PocketBase
      record = await pb.collection('safeRooms').getFirstListItem(`roomCode="${roomCode}"`);
      
      // Check if user is already a member
      const existingMember = await pb.collection('roomMembers').getFirstListItem(
        `roomId="${record.id}" && userId="${pb.authStore.model?.id || 'mock-user-id'}"`
      ).catch(() => null);
      
      if (!existingMember) {
        // Add user as a member
        await pb.collection('roomMembers').create({
          roomId: record.id,
          userId: pb.authStore.model?.id || 'mock-user-id',
          anonymousName: generateAnonymousName()
        });
        
        // Update member count
        await pb.collection('safeRooms').update(record.id, {
          memberCount: (record.memberCount || 1) + 1
        });
      }
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Find in mock data
      record = mockRooms.find(r => r.roomCode === roomCode);
      
      if (!record) {
        // Create a mock room with this code if it doesn't exist
        record = {
          id: 'mock-room-' + Date.now(),
          name: 'Demo Room ' + roomCode,
          category: 'Study',
          description: 'This is a mock room created for demonstration',
          creatorId: 'other-user-id',
          roomCode: roomCode,
          isTemporary: true,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          created: new Date(),
          memberCount: 1,
          lastActivity: new Date()
        };
        
        mockRooms.push(record);
      }
      
      // Add as member if not already
      const existingMember = mockMembers.find(
        m => m.roomId === record.id && m.userId === 'mock-user-id'
      );
      
      if (!existingMember) {
        mockMembers.push({
          id: 'mock-member-' + Date.now(),
          roomId: record.id,
          userId: 'mock-user-id',
          anonymousName: generateAnonymousName()
        });
        
        // Update member count in mock data
        record.memberCount = (record.memberCount || 1) + 1;
      }
    }
    
    if (!record) throw new Error('Room not found');
    
    return record;
  } catch (error) {
    console.error('Error joining safe room:', error);
    throw error;
  }
}

export async function getMySafeRooms() {
  try {
    let rooms = [];
    
    try {
      const memberships = await pb.collection('roomMembers').getFullList({
        filter: `userId="${pb.authStore.model?.id || 'mock-user-id'}"`,
        expand: 'roomId'
      });
      
      rooms = memberships.map(m => m.expand.roomId);
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Get rooms from mock data
      const myMemberships = mockMembers.filter(m => m.userId === 'mock-user-id');
      rooms = myMemberships.map(m => {
        const room = mockRooms.find(r => r.id === m.roomId);
        if (room) {
          // Make sure room has the necessary properties
          return {
            ...room,
            memberCount: room.memberCount || 1,
            lastActivity: room.lastActivity || room.created || new Date()
          };
        }
        return null;
      }).filter(Boolean);
      
      // If no rooms exist yet, create sample rooms
      if (rooms.length === 0) {
        // Add two sample rooms
        const sampleRoom1 = {
          id: 'sample-room-1',
          name: 'Exam Stress Support',
          category: 'Study',
          description: 'A place to discuss exam stress',
          creatorId: 'mock-user-id',
          roomCode: generateRandomCode(8),
          isTemporary: true,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          created: new Date(Date.now() - 2 * 60 * 60 * 1000),
          memberCount: 5,
          lastActivity: new Date()
        };
        
        const sampleRoom2 = {
          id: 'sample-room-2',
          name: 'Freshman Homesickness',
          category: 'Homesick',
          description: 'Support for homesick freshmen',
          creatorId: 'mock-user-id',
          roomCode: generateRandomCode(8),
          isTemporary: true,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          created: new Date(Date.now() - 24 * 60 * 60 * 1000),
          memberCount: 3,
          lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000)
        };
        
        mockRooms.push(sampleRoom1, sampleRoom2);
        
        mockMembers.push(
          {
            id: 'mock-member-1',
            roomId: sampleRoom1.id,
            userId: 'mock-user-id',
            anonymousName: generateAnonymousName()
          },
          {
            id: 'mock-member-2',
            roomId: sampleRoom2.id,
            userId: 'mock-user-id',
            anonymousName: generateAnonymousName()
          }
        );
        
        rooms = [sampleRoom1, sampleRoom2];
      }
    }
    
    return rooms;
  } catch (error) {
    console.error('Error fetching safe rooms:', error);
    throw error;
  }
}

// Function to clear mock data cache (useful for testing)
export function clearMockData() {
  mockRooms = [];
  mockMembers = [];
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