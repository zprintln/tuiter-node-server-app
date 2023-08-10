import posts from "./tuits.js";
let tuits = posts;


const createTuit = (req, res) => {
    const newTuit = req.body;                          // retrieve data from HTTP body
    newTuit._id = (new Date()).getTime()+'';           // add _id field as a time stamp
    newTuit.likes = 0;                                 // initialize likes counter to 0
    newTuit.liked = false;                             // initialize liked flag to false
    newTuit.replies = 0;                               // initialize replies counter to 0
    newTuit.retuits = 0;                               // initialize retuits counter to 0
    newTuit.time = "0s";                               // initialize time counter to 0
    newTuit.handle = "@deerilou";                      // initialize handle to @deerilou
    newTuit.image = "deer.png";                        // initialize image to deer.png
    newTuit.username = "Deer";                         // initialize username to Deer
    newTuit.topic = "Sanrio";                          // initialize topic to Sanrio
    newTuit.dislikes = 0;                              // initialize dislikes counter to 0

    tuits.push(newTuit);                               // add newTuit to array of tuits
    res.json(newTuit);                                 // respond with newTuit
}
const findTuits  = (req, res) => { 
    res.json(tuits);
}

const updateTuit = (req, res) => {
    const tuitdId = req.params.tid;                              // retrieve the ID of the tuit we want to update
    const updates = req.body;                                    // retrieve the updates from the BODY of the request
    const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)  // find the index of the tuit with the given ID
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};       // update the element in tuits array merging old tuit with updates
    res.sendStatus(200);                                        // respond with success code
}

const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;             // retrieve the ID of the tuit we want to remove
    tuits = tuits.filter((t) =>                         // create a new array of tuits // filter out the tuit from the tuits array
      t._id !== tuitdIdToDelete);
    res.sendStatus(200);                                // respond with success code
}


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}
