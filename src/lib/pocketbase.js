import PocketBase from 'pocketbase';


const pb = new PocketBase('http://127.0.0.1:8090'); // Change this to your production URL later

// Mock data storage when PocketBase is unavailable
let mockRooms = [];
let mockMembers = [];
let mockConfessions = [];

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
      isPublic: roomData.isPublic || false, // Add isPublic flag
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      created: new Date(),
      memberCount: 1, // Start with 1 member (the creator)
      lastActivity: new Date()
    };
    
    let record;
    
    try {
      // Try to create in PocketBase
      // Use consistent collection name
      record = await pb.collection('safe_rooms').create(data);
      
      // Also add creator as a member
      await pb.collection('room_members').create({
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

/**
 * Get all public safe rooms
 * @returns {Promise<Array>} Array of public safe room objects
 */
export async function getPublicSafeRooms() {
  try {
    let publicRooms = [];
    
    try {
      // Fetch public rooms from PocketBase
      // Use consistent collection name
      const records = await pb.collection('safe_rooms').getList(1, 20, {
        filter: 'isPublic=true && expiresAt>@now',
        sort: '-lastActivity,created'
      });
      
      publicRooms = records.items;
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Get public rooms from mock data
      publicRooms = mockRooms.filter(room => room.isPublic === true);
      
      // If no public rooms exist yet, create sample public rooms
      if (publicRooms.length === 0) {
        // Create sample public rooms
        const samplePublicRooms = [
          {
            id: 'public-room-1',
            name: 'Finals Week Support',
            category: 'Study',
            description: 'Open discussion for students dealing with finals stress',
            creatorId: 'other-user-id',
            roomCode: generateRandomCode(8),
            isTemporary: true,
            isPublic: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            created: new Date(Date.now() - 12 * 60 * 60 * 1000),
            memberCount: 8,
            lastActivity: new Date(Date.now() - 30 * 60 * 1000)
          },
          {
            id: 'public-room-2',
            name: 'Freshman Lounge',
            category: 'Chill',
            description: 'A space for freshmen to connect and relax',
            creatorId: 'other-user-id',
            roomCode: generateRandomCode(8),
            isTemporary: true,
            isPublic: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            memberCount: 15,
            lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
          },
          {
            id: 'public-room-3',
            name: 'Dormitory Homesickness',
            category: 'Homesick',
            description: 'Support for students missing home and family',
            creatorId: 'other-user-id',
            roomCode: generateRandomCode(8),
            isTemporary: true,
            isPublic: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            created: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            memberCount: 6,
            lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000)
          },
          {
            id: 'public-room-4',
            name: 'Personal Issues Vent',
            category: 'Personal',
            description: 'A safe space to discuss personal problems',
            creatorId: 'other-user-id',
            roomCode: generateRandomCode(8),
            isTemporary: true,
            isPublic: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            created: new Date(Date.now() - 36 * 60 * 60 * 1000),
            memberCount: 4,
            lastActivity: new Date()
          }
        ];
        
        // Add sample rooms to mock data
        mockRooms.push(...samplePublicRooms);
        publicRooms = samplePublicRooms;
      }
      
      // Sort by lastActivity
      publicRooms.sort((a, b) => {
        const dateA = new Date(a.lastActivity || a.created);
        const dateB = new Date(b.lastActivity || b.created);
        return dateB - dateA;
      });
    }
    
    return publicRooms;
  } catch (error) {
    console.error('Error fetching public safe rooms:', error);
    throw error;
  }
}

export async function joinSafeRoom(roomCode) {
  try {
    let record;
    
    try {
      // Find room by code in PocketBase
      // Use consistent collection name
      record = await pb.collection('safe_rooms').getFirstListItem(`roomCode="${roomCode}"`);
      
      // Check if user is already a member
      const existingMember = await pb.collection('room_members').getFirstListItem(
        `roomId="${record.id}" && userId="${pb.authStore.model?.id || 'mock-user-id'}"`
      ).catch(() => null);
      
      if (!existingMember) {
        // Add user as a member
        await pb.collection('room_members').create({
          roomId: record.id,
          userId: pb.authStore.model?.id || 'mock-user-id',
          anonymousName: generateAnonymousName()
        });
        
        // Update member count
        await pb.collection('safe_rooms').update(record.id, {
          memberCount: (record.memberCount || 1) + 1,
          lastActivity: new Date() // Update last activity timestamp
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
          isPublic: false,
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
        
        // Update member count and last activity in mock data
        record.memberCount = (record.memberCount || 1) + 1;
        record.lastActivity = new Date();
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
      // Use consistent collection name
      const memberships = await pb.collection('room_members').getFullList({
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
          isPublic: false,
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
          isPublic: false,
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
// Add this to src/lib/pocketbase.js

// Confessions feature functions
export async function createConfession(confessionData) {
  try {
    const data = {
      title: confessionData.title,
      content: confessionData.message || confessionData.content,
      tags: confessionData.tags || [],
      created: new Date(),
      reactions: {
        upvotes: 0,
        comments: 0
      }
    };
    
    let record;
    
    try {
      // Try to create in PocketBase
      record = await pb.collection('confessions').create(data);
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Create mock data instead
      const mockConfession = {
        ...data,
        id: 'mock-confession-' + Date.now(),
      };
      
      // Add to mock confessions (create this at the top of the file)
      mockConfessions.push(mockConfession);
      
      record = mockConfession;
    }
    
    return record;
  } catch (error) {
    console.error('Error creating confession:', error);
    throw error;
  }
}

// Get confessions with sorting options

export async function getConfessions(sort = 'recent') {
  try {
    let confessions = [];
    
    try {
      // Sort options
      let sortParam = '-created'; // Default to newest first
      if (sort === 'trending') {
        sortParam = '-reactions.upvotes,-created'; // Sort by upvotes, then by date
      }
      
      // Fetch from PocketBase
      const records = await pb.collection('confessions').getList(1, 50, {
        sort: sortParam
      });
      
      confessions = records.items;
      console.log("Successfully fetched confessions from PocketBase:", confessions.length);
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Get mock confessions
      confessions = mockConfessions;
      console.log("Using mock confessions:", confessions.length);
      if (sort === 'trending') {
        confessions.sort((a, b) => {
          const votesA = (a.reactions?.upvotes || 0);
          const votesB = (b.reactions?.upvotes || 0);
          if (votesA !== votesB) return votesB - votesA;
          return new Date(b.created) - new Date(a.created);
        });
      } else {
        confessions.sort((a, b) => new Date(b.created) - new Date(a.created));
      }
    }
    
    return confessions;
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return []; // Return empty array instead of throwing
  }
}

// Update confession reactions (upvotes)
export async function updateConfessionReaction(confessionId, reactions) {
  try {
    let record;
    
    try {
      // Update in PocketBase
      record = await pb.collection('confessions').update(confessionId, {
        reactions: reactions
      });
    } catch (pocketbaseError) {
      console.warn('PocketBase connection failed, using mock data instead:', pocketbaseError);
      
      // Update in mock data
      const confessionIndex = mockConfessions.findIndex(c => c.id === confessionId);
      if (confessionIndex >= 0) {
        mockConfessions[confessionIndex].reactions = reactions;
        record = mockConfessions[confessionIndex];
      }
    }
    
    return record;
  } catch (error) {
    console.error('Error updating confession reaction:', error);
    throw error;
  }
}

// Add this at the top of the file with the other mock data declarations

// In src/lib/pocketbase.js
// Add this function to authenticate as admin when needed

export async function authenticateAsAdmin(email, password) {
  try {
    const authData = await pb.admins.authWithPassword(email, password);
    console.log("Admin authenticated successfully");
    return true;
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return false;
  }
}

export default pb;