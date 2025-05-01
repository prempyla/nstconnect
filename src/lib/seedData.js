import pb from './pocketbase'; // Assumes valid PocketBase client instance

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

    const existingRooms = await pb.collection('safe_rooms').getList(1, 1, {
      filter: 'isPublic=true'
    });

    if (existingRooms.totalItems > 0) {
      console.log("Default rooms already exist, skipping seeding.");
      return;
    }

    console.log("No default rooms found, seeding...");

    for (const room of DEFAULT_ROOMS) {
      await pb.collection('safe_rooms').create({
        ...room,
        roomCode: generateRoomCode(),
        memberCount: Math.floor(Math.random() * 10) + 5,
        isTemporary: true,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date().toISOString()
      });
    }

    console.log("Default rooms seeded successfully!");
  } catch (error) {
    console.error("Error seeding default rooms:", error.message || error, error.data || "No additional error data");
  }
}

function generateRoomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function initConfessionsCollection() {
  try {
    console.log("Checking for confessions collection...");

    const list = await pb.collection('confessions').getList(1, 1);

    if (list.totalItems === 0) {
      console.log("Seeding initial confessions data...");

      const sampleConfessions = [
        {
          title: 'LOVE',
          content: 'I think I might love her.',
          tags: ['Love', 'Relationships'],
          reactions: {
            upvotes: 0,
            comments: 0
          }
        },
        {
          title: 'Failing My Classes',
          content: "I haven't attended any classes this semester and finals are two weeks away. I don't know how to tell my parents I might fail everything.",
          tags: ['Study', 'Stress'],
          reactions: {
            upvotes: 12,
            comments: 3
          }
        }
      ];

      for (const confession of sampleConfessions) {
        await pb.collection('confessions').create(confession);
      }

      console.log("Added sample confessions to the database");
    } else {
      console.log("Confessions already exist, skipping seeding.");
    }

    console.log("Confessions collection setup complete.");
  } catch (error) {
    console.error("Error setting up confessions collection:", error.message || error);
  }
}

export async function initializeCollections() {
  try {
    await seedDefaultRooms();
    await initConfessionsCollection();
  } catch (error) {
    console.error("Initialization failed:", error.message || error);
  }
}
