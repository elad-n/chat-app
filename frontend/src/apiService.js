let userId;

async function apiCall(method, path, body) {
  const response = await fetch(`http://localhost:3001${path}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null,
  });

  return response.json();
}

export const addRoom = name => {
  return apiCall('POST', '/rooms', { name });
};

export const listRooms = () => {
  return apiCall('GET', '/rooms');
};

export const sendMessageReq = (roomId, userId, text) => {
  return apiCall('POST', `/rooms/${roomId}/text`, {
    userId,
    text,
  });
};

export const joinRoom = roomId => {
  return apiCall('GET', `/rooms/${roomId}`);
};

export const getRoomUsers = roomId => {
  return apiCall('GET', `/rooms/${roomId}/users`);
};

export const getRoomTextThread = roomId => {
  return apiCall('GET', `/rooms/${roomId}/text`);
};

export const signupUser = async (name) => {
  const result = await apiCall('POST', '/users', { name });
  userId = result.userId;
  return result;
};

export const listUsers = () => {
  return apiCall('GET', '/users');
};
