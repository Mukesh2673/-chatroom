var users=[];

//join user to chat
function userJoin(id,username,room){

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

    users.splice(uname,1,user);
  }
  else{
 users = [...users,user]
  }
    return users
    
}
//Get current user
function getCurrentUser(id){
return users.find(user=>user.id === id)
}
//user leaves chat
/* function userLeave(id,t){
  
 if(users.length>0)
 {
    users=users?.filter((data)=>(data.username != t));
}
else{
    users=[]
}
return users;
 
// console.log('users',users);
} */



//get room users
function getRoomUsers(room){
    
    return users.filter(user=>user.room === room);
}
module.exports={
    userJoin,
    getCurrentUser,
 
    getRoomUsers
};












