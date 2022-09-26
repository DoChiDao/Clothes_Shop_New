const express = require("express");
const app = express();
const port = 3426;
const path = require('path');
const handles = require('express-handlebars');
const bodyParse = require('body-parser')
const db = require('./config');
const route = require('./route/index')
const cookie = require("cookie-parser")
const nodeMailer = require("nodemailer")
const methodOvRide = require("method-override")


app.use(express.static(path.join(__dirname, "public")));

app.use(methodOvRide("_method"))

app.use(bodyParse.urlencoded({
   extended : false
}))

app.use(bodyParse.json());

app.use(cookie());

app.engine("hbs", handles.engine({
      extname : ".hbs",
      helpers : {
         length : (arr) => arr.lenght,
         changeArr : (arr) => {
             const array = Object.keys(arr)
             return array.length;
         }
      }
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources//views"))

db.connect();


route(app);

app.get('/about', (req, res) => {
   const dta = req.cookies.User;
   if(dta != null){
       return res.render("giaodien/about", {dta, yUser : true});
   }
   else{
       return res.render("giaodien/about", { yUser : false});
   }
})

app.listen(port, () => console.log(`http://localhost:${port}`));