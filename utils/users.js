var users=[];

//join user to chat
function userJoin(id,username,room){

    const user={id,username,room};
    if(users.length>0)
    {

    let inArr=users.filter(data=>(data.username==user.username))
    if(inArr.length<=0)
    {
    users.push(user);    
    }
 
    }
    else{
        users.push(user); 
        }
    return user;

}
//Get current user
function getCurrentUser(id){
return users.find(user=>user.id === id)

}
//user leaves chat
function userLeave(id,t){
     console.log('leavemessage in users',id)
     console.log('leavemessageasfd22 in users',t)
     console.log(users);
     console.log(t,users[0].username);
 if(users.length>0)
 {
    users=users?.filter((data)=>(data.username != t));
}
else{
    users=[]
}
return users;
 
// console.log('users',users);
}



//get room users
function getRoomUsers(room){
    return users.filter(user=>user.room === room);
}
module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};













