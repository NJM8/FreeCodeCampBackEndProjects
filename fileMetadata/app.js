const express = require('express');
const morgan = require('morgan');
const fileRouter = require('./routes/fileRouter');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(__dirname + "/views"));

app.use('/', fileRouter);

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
});
