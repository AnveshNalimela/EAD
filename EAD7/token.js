const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

const users = [
    {
        name: "CBIT",
        msg: "Welcome"
    }, {
        name: "hello",
        msg: "Yentra"
    }
]

//GET TOKEN
app.post('/token', (req, res) => {
    const user = { name: req.body.username }
    const token = jwt.sign(user, process.env.SECERT_KEY)
    return res.json({ jwttoken: token })
})

app.get('/', (req, res) => {
    res.send("hellll")
}
)

// app.get('/', (req, res) => {
//     const header = req.headers['authorization']
//     const token = header.split(' ')[1]
//     jwt.verify(token, process.env.SECERT_KEY, (err, user) => {
//         if (err) {
//             console.log("Invalid token")
//             res.sendStatus(403)
//         }
//         else {
//             console.log(user)
//             req.user = user
//             res.json(user)
//             res.sendStatus(200)
//         }
//     })

// })

const port = 3000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)

})