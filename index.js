const express = require('express');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Custom middleware to verify working hours
app.use((req, res, next) => {
  const currentDay = moment().format('dddd');
  const currentHour = moment().format('H');

  if (currentDay === 'Saturday' || currentDay === 'Sunday' || currentHour < 9 || currentHour >= 17) {
    return res.send('The website is only available during working hours (Monday to Friday, from 9 to 17).');
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get("/services", (req, res) => {
    res.status(200).render("services", {
      pageTitle: "Service page"
  } );
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
