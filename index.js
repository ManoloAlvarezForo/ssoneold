'use strict'

const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(config.db, (err, res) =>{
    if (err) {
        return console.log(`Error to connect to the DB: ${err}`);
    }
    console.log('Connection to DB was successfully...!')
    app.listen(config.port, () => {
        console.log(`API REST running in http://localhost:${config.port}`)
    })
})