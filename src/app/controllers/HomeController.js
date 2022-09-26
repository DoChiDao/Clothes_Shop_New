const account = require("../models/Account")
const nodeMailer = require("nodemailer")
const multer = require("multer")
var code = "";
const path = require('path');
const { TRUE } = require("node-sass");


// var storage = multer.diskStorage({
//      destination : path.join( " src\\public\\uploads"),
//      filename : (req, file, cb) => {
//         cb(null, file.originalname )
//      }
// })

class HomeController{
  
    index(req, res, next){
        // var user = {
        //     name : "David Đạo",
        //     age : 18
        //  }
        res.clearCookie("Code")
        const dta = req.cookies.User;
        console.log(dta)
        if(dta != null){
            return res.render("giaodien/home", {dta, yUser : true});
        }
        else if(dta == null ){
            return res.render("giaodien/home", { yUser : false});
        }
        
    }


    admin(req, res, next){
        const dtta = req.cookies.User;
        account.find({})
        .then(dta => {
                return res.render("adminUI/admin", {dta : dta.map(dta => dta.toObject(),), yAdm : true, dtta})
        })
        .catch(next)
    }
     
    getLstUS(req, res, next){
        const dtta = req.cookies.User;
        account.find({})
        .then(dta => {
                return res.render("adminUI/admin", {dta : dta.map(dta => dta.toObject(),), yAdm : true, dtta})
        })
        .catch(next)
    }


    login(req, res, next){
        
        account.findOne({email : req.body.email, passWord : req.body.passWord})
        .then(dta => {
            if(dta != null){     
                res.cookie("User", dta, {
                    maxAge : 24*60*60*10000,
                    httpOnly : false,
                })

                if(dta.access == "admin"){
                  return res.redirect("/admin")
                }
                else{
                  
                   return res.redirect('/')  
                  }
            }else{
                // res.render("giaodien/home", {yUser : false,
                //                              messEr : "Tài khoản hoặc mật khẩu không đúng"})
               
                return  res.render("giaodien/home", { errLogin : true ,errMess : "Không tìm thấy tài khoản hoặc mật khẩu", yUser : false, yCode : false, ySignOut : false})
            }
        })
    }

    logout(req, res, next){
        res.clearCookie('User');
        return res.redirect("/")
    }

   async getCode(req, res, next){

         var posible = "qwertyuiopasdfghjklzxcvbnm1234567890"
         var lenght = 5

        for(let i = 0; i < lenght ; i++){
            code += posible.charAt(Math.floor(Math.random() * posible.length))
         }

         res.cookie("Code", code, {
                    maxAge : 1000 * 1000,
                    httpOnly : false,
         })


        
        var transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: 'chidao1090@gmail.com',
                pass: 'szxluririidfkiet'
            }
        });
    
        await transporter.sendMail(
            {
                from: 'chidao1090@gmail.com',
                to: `${req.body.email}`,
                subject: "This is Code send you",
                text: "send message",
                html: `<h1 style ='color : red '>Mã code is ${code} </h1>`
            }, (err) => {
                if (err) {
                    return res.json({
                        message: "Lỗi",
                        err
                    })
                } else if (!err)
                    return res.json({
                        menubar: 'thanh cong'
                    })
            }
        
        )

        code = "";
         
        res.render("giaodien/home" , {yCode : true, yUser : false})
    }     

    checkCode(req, res, next){
        const checkcode = req.cookies.Code
        if(checkcode == req.body.code)
            res.render("giaodien/home", {ySignOut : true, yCode : false , yUser : false})
        else{
            res.render("giaodien/home", {ySignOut : false, yCode : true , yUser : false})
        }
    }


    signOut(req, res, next){
         const us = new account({
            firstName : req.body.firstName,
            email : req.body.email,
            passWord : req.body.passWord,
            access : "nhanvien",
            numberPhone : req.body.numberPhone
         })
         us.save()
         .then(()=> res.redirect("/"))
    }
    
    //[get]
    createUI(req, res, next){
          const dtta = req.cookies.User;
          account.find()
          .then(dta => res.render("adminUI/createUSUI", {yAdm : true , dta : dta.map(dta => dta.toObject()), yCode : false , ySignOut : false, dtta }) )
          
    }
    
   
}

 

   




module.exports = new HomeController();