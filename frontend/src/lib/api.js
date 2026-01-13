const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Helper function to handle API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', {
        url,
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', { url, error: error.message });
    throw error;
  }
}

// Confessions API
export const confessionsAPI = {
  create: async (confessionData) =>
    apiRequest('/confessions', {
      method: 'POST',
      body: JSON.stringify(confessionData),
    }),

  getAll: async () => apiRequest('/confessions'),

  getById: async (id) => apiRequest(`/confessions/${id}`),

  flag: async (id, reason) =>
    apiRequest(`/confessions/${id}/flag`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),
};

// Safe Rooms API  — backend routes are mounted at /rooms/*
export const safeRoomsAPI = {
  create: async (roomData) =>
    apiRequest('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    }),

  getPublic: async () => apiRequest('/rooms/public'),

  getMyRooms: async () => apiRequest('/rooms/me'),

  // Join by code (used by JoinRoomForm)
  join: async (joinCode) =>
    apiRequest('/rooms/join', {
      method: 'POST',
      body: JSON.stringify({ joinCode }),
    }),

  // Join a specific public room by ID
  joinById: async (roomId) =>
    apiRequest(`/rooms/${roomId}/join`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  getMessages: async (roomId, cursor) => {
    const params = cursor ? `?cursor=${cursor}` : '';
    return apiRequest(`/rooms/${roomId}/messages${params}`);
  },

  getRoomById: async (roomId) => apiRequest(`/rooms/${roomId}`),

  leaveRoom: async (roomId) =>
    apiRequest(`/rooms/${roomId}/leave`, {
      method: 'DELETE',
    }),

  banUser: async (roomId, targetUserId) =>
    apiRequest(`/rooms/${roomId}/ban`, {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
    }),

  flagMessage: async (messageId, reason) =>
    apiRequest(`/messages/${messageId}/flag`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),
};

// Challenges API
export const challengesAPI = {
  create: async (challengeData) =>
    apiRequest('/challenges', {
      method: 'POST',
      body: JSON.stringify(challengeData),
    }),

  getAll: async () => apiRequest('/challenges'),

  getById: async (id) => apiRequest(`/challenges/${id}`),

  delete: async (id) =>
    apiRequest(`/challenges/${id}`, {
      method: 'DELETE',
    }),

  join: async (id) =>
    apiRequest(`/challenges/${id}/join`, {
      method: 'POST',
    }),

  complete: async (id, checkInData) =>
    apiRequest(`/challenges/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(checkInData),
    }),

  getMyChallenges: async () => apiRequest('/challenges/my'),
};
