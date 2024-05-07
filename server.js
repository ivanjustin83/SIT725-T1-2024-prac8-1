const express = require("express");
const bodyParser = require('body-parser');
const { connectToDB, client } = require('./dbconnection');


const app = express();
let http = require('http').createServer(app);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let projectsRoute = require('./routers/routes')

app.get('/', (req, res) => {
    res.render('index.html')
})

app.use('/api/', projectsRoute);

connectToDB();

let io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});


var port = process.env.port || 3000;

// app.listen(port, () => {
//     console.log("App listening to : " + port);
// })

http.listen(3000,
    () => { console.log('express server started'); });
