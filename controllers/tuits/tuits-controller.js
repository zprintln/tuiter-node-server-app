import * as tuitsDao from './tuits-dao.js'


const createTuit = async (req, res) => {
    const newTuit = req.body;                          // retrieve data from HTTP body
    
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

    const insertedTuit = await tuitsDao.createTuit(newTuit);
  
    res.json(insertedTuit);                                 // respond with newTuit
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
} 

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid;                                     // retrieve the ID of the tuit we want to update
    const updates = req.body;                                           // retrieve the updates from the BODY of the request
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates); // update the tuit with the given ID
    res.json(status);                                                 // respond with status object
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.tid;                           // retrieve the ID of the tuit we want to delete
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);        // delete the tuit with the given ID
    res.json(status);                                              // respond with status object
}


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}
