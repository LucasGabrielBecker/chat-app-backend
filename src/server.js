import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
app.get('/status', (req, res) => {
  res.json({ status: 'ok' }).status(200)
})

io.on('connection', socket => {
  socket.on('message', ({ name, message, created_at }) => {
    io.emit('message', { name, message, created_at })
  })
})

server.listen(PORT, () => console.log('running on port: ', PORT))
