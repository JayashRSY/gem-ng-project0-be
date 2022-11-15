const express = require('express');
require('./db/connect')
const User = require('./models/users')


const app = express()
app.use(express.json())



// READ DATA FROM MONGODB DOCUMENT
// const getDocument = async () => {
//     try {
//         const mongoRes = await User.find()
//         console.log(mongoRes)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// getDocument()

//UPDATE DOCUMENT IN MONGODB
// const updateDocument = async (_id) => {
//     try {
//         const mongoRes = await User.findByIdAndUpdate({_id}, {
//             $set: {
//                 name:"New name"
//             }
//         })
//     } catch(err) {
//         console.log(err)
//     }

// }
// updateDocument("636b98aad7966de4d17712a8")

//DELETE DOCUMENT IN MONGODB
// const deleteDocument = async (_id) => {
//     try {
//         const mongoRes = await User.findByIdAndDelete({_id})
//         console.log(mongoRes)
//     } catch(err) {
//         console.log(err)
//     }
// }
// deleteDocument()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post("/signup", (req, res) => {
    // CREATE DATA IN MONGO DOCUMENT
    const userData = new User(req.body)
    userData.save()
        .then(res.send(userData))
        .catch(err => console.log(err))
})

app.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const mongoRes = await User.findOne({email:email})
        if (mongoRes.password === password) {
            res.send(mongoRes)
        } else {
            res.send("Invalid login details")
        }
    } catch(err) {
        res.send("Invalid Email")
    }
})

app.get('/allusers', (req, res) => {
    User.find()
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})