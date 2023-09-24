const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const ApiRoute = require('./routes/apiRoute.js')

mongoose.connect('mongodb://127.0.0.1:27017/crudtest')
  .then(() => {
    console.log('data base Connected!')
  } )
  .catch((error)=>{
    console.log(`someissues in database,${error}`)
  })

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use('/api/', ApiRoute)

app.listen(PORT,()=>{
  console.log(`my app is running in this port ${PORT}`)
})