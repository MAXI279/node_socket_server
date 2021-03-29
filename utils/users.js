let users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function arrayRemoveById(arr, value) {
  return arr.filter(function(ele){ 
      return ele.id != value; 
  });
}

function arrayReturnEqualById(arr, value) {
  return arr.filter(function(ele){ 
      return ele.id == value; 
  });
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    let eliminados =  arrayReturnEqualById(users, id) // users.splice(index, 1)[0];
    users = arrayRemoveById(users, id);
    return eliminados
  }
}


// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// Get rooms where user is
function getUserRooms(user) {
  return users.filter(user => user.usermame === user);
}

// Get users
function getUsers(room) {
  return users;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUsers,
  getUserRooms
};