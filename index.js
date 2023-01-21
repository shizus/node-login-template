const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;
const users = require('./src/users/users')
const db = require('./models/index');

const sequelize = db.sequelize;



// Setting up CORS to let the server answer the front-end
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.get('/', async (req, res) => {
    let answer = ''
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
        answer = 'connected'
        } catch (error) {
        console.error('Unable to connect to the database:', error)
        answer = 'not stonks!'
    }
  res.json({answer: answer})
});

app.use('/users', users)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
