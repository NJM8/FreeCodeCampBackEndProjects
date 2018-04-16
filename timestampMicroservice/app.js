const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(__dirname + "/views"));

app.get('/', (req, res, next) => {
  return res.render('index');
});

app.get('/:myDate', (req, res, next) => {
  const myDate = req.params.myDate;
  let dates = {
    unixDate: null,
    naturalDate: null
  }

  if (myDate.match(/[a-z]/gi)) {
    dates.naturalDate = new Date(myDate.replace('%20', ''));
    dates.unixDate = Math.floor(new Date(dates.naturalDate).getTime() / 1000);
  } else {
    dates.naturalDate = new Date(myDate * 1000);
    dates.unixDate = myDate;
  }

  if (dates.naturalDate === 'Invalid date') {
    dates.unixDate = null;
    dates.naturalDate = null;
  }

  return res.json(dates);
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
  return res.render('error');
});

app.listen(PORT, () => {
  console.log(`App is being served on port ${PORT}`);
})