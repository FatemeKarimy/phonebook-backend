const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://gnu:database1@cluster0.wcksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


app.listen(3000, function() {

    
    console.log('listening on 3000')

    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.post('/quotes', (req, res) => {
        console.log(req.body)
    })

    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
    console.log('Connected to Database')
    })
    .catch(error => console.error(error))
})