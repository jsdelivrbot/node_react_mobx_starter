
require('dotenv').load();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = express();
app.set('view engine', 'ejs')

app.use('/public', express.static('public'));
//Webpack config to enable hot reloading
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading
  console.log('trying to hot reload');
  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!

  // RE-ENABLE WHEN YOU REFACTOR TO SERVER FOLDER
  // var watcher = chokidar.watch('./server');
  // watcher.on('ready', function() {
  //   watcher.on('all', function() {
  //     console.log('Clearing /server/ module cache from server');
  //     Object.keys(require.cache).forEach(function(id) {
  //       if (/\/server\//.test(id)) {
  //         delete require.cache[id];
  //       }
  //     });
  //   });
  // });
};

// THIS IS OUR REST API
app.get('/api/questions', function (req, res) {
  console.log('req at questions endpoint');
  res.send({
    section1: {
      question1: {
          question_text: 'This is a question!',
          option_A_text: 'Option A dope as',
          option_B_text: 'Option B doper than'
        },
      question2: {
          question_text: 'This is another question bruhhh!',
          option_A_text: 'Option A #2',
          option_B_text: 'Option B #2'
        },
      question3: {
          question_text: 'This is question 3 bruhhh!',
          option_A_text: 'Option A #3',
          option_B_text: 'Option B #3'
        },
    },
    section2: {
      question1: {
          question_text: 'This is section 2 question 1 bruhhh!',
          option_A_text: 'Option A #4',
          option_B_text: 'Option B #4'
        },
      question2: {
          question_text: 'This is section 2 question 2 bruhhh!',
          option_A_text: 'Option A #5',
          option_B_text: 'Option B #5'
        },
      question3: {
          question_text: 'Is nate cool?',
          option_A_text: 'Yes',
          option_B_text: 'No way Jose'
        },
      question4: {
          question_text: 'Is Zach a good kayaker',
          option_A_text: 'Hell ya',
          option_B_text: 'Hells more ya'
        },
    },
    section3: {
      question1: {
          question_text: 'This is section 3 question 1 bruhhh!',
          option_A_text: 'Option A #6',
          option_B_text: 'Option B #6'
        },
      question2: {
          question_text: 'This is section 3 question 2 bruhhh!',
          option_A_text: 'Option A #7',
          option_B_text: 'Option B #7'
        },
      question3: {
          question_text: 'This is section 3 question 3 bruhhh!',
          option_A_text: 'Option A #8',
          option_B_text: 'Option B #8'
        },
      question4: {
          question_text: 'This is section 3 question 4 bruhhh!',
          option_A_text: 'Option A #9',
          option_B_text: 'Option B #9'
        },
    },
  });
});

app.get('/intro', function (req, res) {
  res.render('index');
});

app.get('/survey/*', function (req, res) {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var debug = require('debug')('oh-xmas-tree:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('our node app is spinning on port ' + bind + '!');
};

module.exports = app;
