import people from './users.js'
let users = people
const UserController = (app) => {
   app.get('/api/users', findUsers)
   app.get('/api/users/:uid', findUserById);      // map path pattern to handler function
   app.post('/api/users', createUser);            // map URL pattern to handler function
   app.delete('/api/users/:uid', deleteUser);  
   app.put('/api/users/:uid', updateUser); 
}
const findUserById = (req, res) => {             // function called if URL matches pattern
   const userId = req.params.uid;                // retrieve uid from request parameter map
   const user = users                            // find user in users array whose _id
     .find(u => u._id === userId);               // matches userId retrieved from params
   res.json(user);                               // respond to client with user found in JSON
}
const createUser = (req, res) => {              // function invoked if URL matches pattern
   const newUser = req.body;                    // retrieve new user from BODY in request
   newUser._id = (new Date()).getTime() + '';   // add an _id property with unique timestamp
   users.push(newUser);                         // append new user to users array
   res.json(newUser);                           // respond with new user to client
} 
 
const findUsers = (req, res) => {    // function called if URL matches pattern
   const type = req.query.type        // retrieve type parameter from query
   if(type) {                         // if type parameter in query
     const usersOfType = users        //  find users of that type
       .filter(u => u.type === type)  
     res.json(usersOfType)            // respond with users of that type
     return                           // return so it doesn't continue
   } 
   res.json(users)                    // otherwise respond with all users
}
const deleteUser = (req, res) => { 
   const userId = req.params['uid'];                 // get user ID from path parameter uid filter out the user
   users = users.filter(usr => usr._id !== userId);  // whose ID is the ID of the user we want to remove
   res.sendStatus(200);                              // respond with success code
}
const updateUser = (req, res) => {                 // handle PUT /api/users/:uid
   const userId = req.params['uid'];               // get user ID from path
   const updates = req.body;                       // BODY includes updated fields
   users = users.map((usr) =>                      // create a new array of users
     usr._id === userId ?                          // if current user's ID matches ID we want to update
       {...usr, ...updates} :                      // merge old user with new updates
       usr                                         // otherwise just keep old user
   );
   res.sendStatus(200);                            // respond with success code
  }
  
  
export default UserController

