var express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Инициализация таблиц
require('./models/init').init();

app.use('/', webRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONT_DOMAIN
  }
});

io.on('connection', (socket) => {
  console.log(`IO connected on: ${new Date()}`);

  socket.on('general_chat-new_message', (message) => {
    // TODO: Сохранение куда-либо

    io.emit('general_chat-message_is_stored', {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      message: message,
      created_at: new Date(),
      connection_id: socket.id,
    });
  });

  socket.on('general_chat-check_stats', (arg) => {
    io.emit('general_chat-new_stats', {
      total_connections: io.engine.clientsCount,
    });
  });

  socket.on('room_chat-new_message', (arg) => {
    // TODO: Сохранение куда-либо

    const room = `room_${arg.room_id}`;

    socket.join(room);

    io.to(room).emit('room_chat-message_is_stored', {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      message: arg.message,
      created_at: new Date(),
      connection_id: socket.id,
    });
  });

  socket.on('room_chat-check_stats', (arg) => {
    const room = `room_${arg.room_id}`;

    const roomClients = io.sockets.adapter.rooms.get(room);

    io.to(room).emit('room_chat-new_stats', {
      total_connections: io.engine.clientsCount,
      room_connections: roomClients ? roomClients.size : 0,
    });
  });

  socket.on('private_chat-new_message', (arg) => {
    // TODO: Сохранение куда-либо

    io.to(arg.connection_id).emit('private_chat-message_is_stored', {
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      message: arg.message,
      created_at: new Date(),
      connection_id: socket.id,
    });
  });
});

httpServer.listen(3001);

module.exports = app;
