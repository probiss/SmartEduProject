const express = require('express');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();

//Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/eduSmart-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set('view engine', 'ejs');

//Global Veriable
global.userIN = null;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: 'my_little_kitten', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/eduSmart-db' }),
  })
);

//Routes
app.use('*', (req, res, next) => {userIN = req.session.userID; next();});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});