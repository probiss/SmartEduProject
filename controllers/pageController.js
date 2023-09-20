const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
exports.getIndexPage = (req, res) => {
  res.status(200).render('index',{
    page_name: "index"
  });
}

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = (req, res) =>{
  const outputMessage = `
      <h1>Mail Details</h1>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h1>Message</h1>
      <p>${req.body.message}</p>
  `

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS
    }
  });

  let mailOptions = {
      from: process.env.NODE_EMAIL,
      to: 'atutargenc@gmail.com',
      subject: 'Hello From Smart Edu✔' ,
      html: outputMessage
  } 

  transporter.sendMail(mailOptions,(err, data)=>{
      if(err){
          req.flash("error", "Something went wrong. Please try again.")

      }else{
        req.flash("success", "Your message has been sent successfully.")
        res.status(200).redirect('contact');
      }
  })
}