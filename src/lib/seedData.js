// src/lib/seedData.js

import pb from './pocketbase'; // Import your pocketbase client

const DEFAULT_ROOMS = [
  {
    name: "Let's Talk It Out",
    category: "Vent",
    description: "A safe space to vent about anything on your mind",
    isPublic: true
  },
  {
    name: "College Pressure Zone",
    category: "Study",
    description: "Support for dealing with academic pressures and stress",
    isPublic: true
  },
  {
    name: "Love & Heartbreak",
    category: "Personal",
    description: "A place to discuss relationship joys and struggles",
    isPublic: true
  },
  {
    name: "Be Yourself",
    category: "Chill",
    description: "Embrace authenticity and self-acceptance",
    isPublic: true
  },
  {
    name: "Free Voice Corner",
    category: "Other",
    description: "Express yourself freely in a judgment-free zone",
    isPublic: true
  }
];

export async function seedDefaultRooms() {
  try {
    console.log("Checking for default rooms...");
    
    // Check if we already have public rooms
    const existingRooms = await pb.collection('safe_rooms').getList(1, 1, {
      filter: 'isPublic = true'
    });
    
    // If there are already public rooms, don't seed
    if (existingRooms.totalItems > 0) {
      console.log("Default rooms already exist, skipping seeding.");
      return;
    }
    
    console.log("No default rooms found, seeding...");
    
    // Create the default rooms
    for (const room of DEFAULT_ROOMS) {
      const randomCode = generateRoomCode();
      await pb.collection('safe_rooms').create({
        ...room,
        roomCode: randomCode,
        memberCount: Math.floor(Math.random() * 10) + 5, // Random number between 5-15
        isTemporary: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        created: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      });
    }
    
    console.log("Default rooms seeded successfully!");
  } catch (error) {
    console.error("Error seeding default rooms:", error);
  }
}

// Helper function to generate a random room code
function generateRoomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
// Add this to src/lib/seedData.js

// Initialize the confessions collection
export async function initConfessionsCollection() {
  try {
    console.log("Checking for confessions collection...");
    
    // Check if the confessions collection exists
    try {
      await pb.collection('confessions').getList(1, 1);
      console.log("Confessions collection already exists.");
    } catch (error) {
      // Collection doesn't exist or couldn't be accessed, let's seed some data
      console.log("Seeding initial confessions data...");
      
      // In a real scenario, you'd create the collection in the PocketBase Admin UI
      // or via the PocketBase API if you have admin privileges
      
      // For now, we'll ensure our mock data is populated
      if (typeof mockConfessions !== 'undefined' && mockConfessions.length === 0) {
        mockConfessions = [
          {
            id: 'conf-001',
            title: 'LOVE',
            content: 'I Think i might love her',
            tags: ['Love', 'Relationships'],
            created: new Date('2025-04-19T14:30:00'),
            reactions: {
              upvotes: 0,
              comments: 0
            }
          },
          {
            id: 'conf-002',
            title: 'Failing My Classes',
            content: "I haven't attended any classes this semester and finals are two weeks away. I don't know how to tell my parents I might fail everything.",
            tags: ['Study', 'Stress'],
            created: new Date('2025-04-18T09:45:00'),
            reactions: {
              upvotes: 12,
              comments: 3
            }
          },
          {
            id: 'conf-003',
            title: 'Secret Crush',
            content: "I've had a crush on my roommate's boyfriend for the entire semester. I feel horrible about it but I can't stop these feelings.",
            tags: ['Love', 'Friendship'],
            created: new Date('2025-04-17T16:20:00'),
            reactions: {
              upvotes: 24,
              comments: 7
            }
          }
        ];
      }
    }
    
    console.log("Confessions collection setup complete.");
  } catch (error) {
    console.error("Error setting up confessions collection:", error);
  }
}

// Call this function when initializing your app
export async function initializeCollections() {
  await seedDefaultRooms();
  await initConfessionsCollection();
}