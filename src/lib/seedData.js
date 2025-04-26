// Add this to a dedicated file like lib/seedData.js or within an appropriate initialization file

import { pb } from './pocketbase'; // Import your pocketbase client

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
        created: new Date().toISOString()
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