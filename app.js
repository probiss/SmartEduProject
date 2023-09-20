const express = require('express');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

//Database Connection
mongoose.connect('mongodb+srv://bulutedu:edusmart2023@clusteredu.uctjl7f.mongodb.net/smartedu-db?retryWrites=true&w=majority', {
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
    secret: 'my_little_kitten',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://bulutedu:edusmart2023@clusteredu.uctjl7f.mongodb.net/smartedu-db?retryWrites=true&w=majority' }),
  })
  );
  app.use(flash());
  app.use((req,res,next) => {
    res.locals.flashMessages = req.flash();
    next();
  })
  app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

//Routes
app.use('*', (req, res, next) => {userIN = req.session.userID; next();});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});