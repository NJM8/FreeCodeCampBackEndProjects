const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(__dirname + "/views"));
app.enable('trust proxy');

app.get('/', (req, res, next) => {
  return res.render('index');
});

app.get('/whoami', (req, res, next) => {
  let ip = req.ip.split(':');
  let whoareyou = {
    ipAddress: ip[ip.length - 1],
    language: req.headers['accept-language'].split(',')[0],
    operatingSystem: req.headers['user-agent'].split('(')[1].split(')')[0]
  }

  res.json(whoareyou);
})

// catch 404 and send to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  let mode = app.get('env');
  if (mode === 'development') {
    console.log(err);
  }
  res.status(err.status || 500);
  return res.sendFile(__dirname + '/views/error.html');
});

app.listen(PORT, () => {
  console.log(`App is being served on port ${PORT}`);
})