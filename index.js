'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 4500;

require('dotenv').config();

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PWD+'@condormarket-kmpgf.mongodb.net/CondorMarket?retryWrites=true')
        .then(() => {            
            console.log("Connection succesfull.");
            //Let's create the server
            app.listen(port, () => {
                console.log("Server is running in localhost:"+port);
            });
        })
        .catch(err => console.log(err));