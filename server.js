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
  res.json(users)
})

server.get("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserById(id)

  if(user) {
    res.json(user)
  } else {
    res.status(404).json({message: "User not found"})
  }
})

server.post("/users", (req, res) => {
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio
  })
  res.json(201).json(newUser)
})


server.put("/users/:id", (req, res) => {
  const id = req.params.id
  const user = db.getUserById(id)

  if(user) {
    const updatedUser = db.updateUser(id, {
      name: req.body.name,
      bio: req.body.bio
    })
    res.json(updatedUser)
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
    res.status(404).json({message: "User not found"})
  }

})



server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});