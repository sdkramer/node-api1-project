const express = require('express');
const db = require('./database');

const port = 5000;

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
  res.send("Hello from api project!")
});


server.get("/users", (req, res) => {
  const users = db.getUsers()

  if(users) {
    res.json(users)
  } else {
    res.status(500).json({ 
      message: "The users information could not be retrieved."
    })
  }
  
})

server.get("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserById(id)

  if(user) {
    res.json(user)
  } else {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  }
})

server.post("/users", (req, res) => {

  if(req.body.name && req.body.bio) {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
      })
      res.json(201).json(newUser)
    } else {
      res.status(400).json({ message: "Please provide name and bio for the user"})
    }
  
})

// server.post("/users", (req,res) => {
//   const newUser = db.createUser({
//     name: req.body.name,
//     bio: req.body.bio
//   })

//   res.json(201).json(newUser)
// })


server.put("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserById(id)

  if(user) {
    const updatedUser = db.updateUser(id, {
      name: req.body.name,
      bio: req.body.bio
    })
    res.status(200).json(updatedUser)
  } else {
    res.status(404).json({
      message: "User not found to update"
    })
  }
})


// server.delete("users/:id", (req, res) => {
//   const id = req.params.id
//   const user = db.getUserById(id)

//   if(user) {
//     db.deleteUser(id)

//     res.status(204).end()
//   } else {
//     res.status(404).json({
//       message: "User not found so not able to be deleted"
//     })
//   }
// })

server.delete("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserById(id)
  

  if(user) {
    const updatedUser = db.deleteUser(id)

    res.status(204).end()
  }else {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  }

})



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});