const express = require('express')
const router = express.Router()

const db = require('../../models/index');
const sequelize = db.sequelize;

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/login', async (req, res) => {

    // Find all users
    console.log("username:", req.query.email);
    console.log("password:", req.query.password);

    const users = await sequelize.models.User.findAll({
        where: {
            email: req.query.email ?? '',
            password: req.query.password ?? ''
        }
    });
    console.log(users.every(user => user instanceof sequelize.models.User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    res.json({'users': users})

})

// define the about route
router.get('/register', (req, res) => {
    res.send('About birds')
})

module.exports = router