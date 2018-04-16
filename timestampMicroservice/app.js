const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(__dirname + "/views"));

app.get('/', (req, res, next) => {
  return res.render('index');
});

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
  return res.render('error');
});

app.listen(PORT, () => {
  console.log(`App is being served on port ${PORT}`);
})