var users = [];
const addUser = (id, username, room) => {

    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const user = {
        id,
        username,
        room
    };
 
    const uname = users.findIndex((user1) => 
    user1.username === username
  );
  if(uname>=0)
  {
    console.log('splice');
    users.splice(uname,1,user);
  }
  else{
 users = [...users,user]
  }

  console.log('index',uname);
  
  console.log('users',users);

    return {
        users
    };

}



const getUser = (id) => users
    .find((user) => user.id === id);

const getUsersInRoom = (room) => users
    .filter((user) => user.room === room);

module.exports = {
    addUser,
    getUser,
    getUsersInRoom
};