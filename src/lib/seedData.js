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
      const list = await pb.collection('confessions').getList(1, 1);
      console.log("Confessions collection exists with", list.totalItems, "items");
      
      // If the collection exists but is empty, we could seed some data
      if (list.totalItems === 0) {
        console.log("Seeding initial confessions data...");
        
        // Sample confessions for testing
        const sampleConfessions = [
          {
            title: 'LOVE',
            content: 'I Think i might love her',
            tags: ['Love', 'Relationships'],
            created: new Date().toISOString(),
            reactions: {
              upvotes: 0,
              comments: 0
            }
          },
          {
            title: 'Failing My Classes',
            content: "I haven't attended any classes this semester and finals are two weeks away. I don't know how to tell my parents I might fail everything.",
            tags: ['Study', 'Stress'],
            created: new Date().toISOString(),
            reactions: {
              upvotes: 12,
              comments: 3
            }
          }
        ];
        
        // Add the sample confessions to PocketBase
        for (const confession of sampleConfessions) {
          await pb.collection('confessions').create(confession);
        }
        
        console.log("Added sample confessions to the database");
      }
    } catch (error) {
      console.warn("Error accessing confessions collection:", error);
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