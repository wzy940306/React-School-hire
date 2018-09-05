const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const model = require('./model')
const Chat = model.getModel('chat')
const io = require('socket.io')(server)

io.on('connection',function(socket){
 console.log('user login')
 socket.on('sendMsg',function(data){
    const{from,to,msg} = data
    const Chatid = [from,to].sort().join('_')
    Chat.create({chatid:Chatid,from,to,content:msg},function(e,d){
        
      io.emit('recvMsg',Object.assign({},d._doc))  
    }) 
 })
})
const userRouter = require('./user')
const disRouter = require('./display')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use('/display',disRouter)
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})
app.get('/', function (req, res) {
    res.send('<h1>hello jk </h1>');
})

