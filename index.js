const express = require('express');
const db = require('./dbServer.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
const jwt_decode = require('jwt-decode');
app.use(bodyParser.json());
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));

const request = require('request');
const https =  require('https');
const axios = require('axios');

const Nexmo = require('nexmo');//msg api
const nexmo = new Nexmo({
  apiKey: "",
  apiSecret: ""
});
app.get('/',function(req,res){
    let user_email_address = req.body.email;
    let user_password = req.body.password;
    if(user_email_address && user_password)
    {
        query = `SELECT * from users WHERE email ='${user_email_address}'`;
        db.query(query,function(error,data){
            if(data.length > 0)
            {
                let username = data[0].username;
                let company_id = data[0].company_id;
                // console.log(username);
                return res.json({token:jsonwebtoken.sign({user:username,company_id:company_id},JWT_SECRET),});
            }
            
            else
            {
                res.send("pls check  your password");
            }
        })
    }
})


app.get('/userlist/:data',function(req,res){
    let token = req.params.data;
    let decode_token = jsonwebtoken.decode(token);
    console.log(decode_token.company_id);
     query = `select * from users where company_id='${decode_token.company_id}'`;
     db.query(query,function(error,data){
        
            // console.log(username);
            return res.json({data});
        
    })
})


app.post('/uploadfile',async (req,res)=>{
    // console.log(req.files);
    try{
        if(!req.files){
            res.send({
                status:false,
                message:'No file upload'
            });
        }else{
            let file_upload = req.files.file_upload;
            file_upload.mv(__dirname +'/uploads/'+file_upload.name);
            res.send({
                status:true,
                message:'file is upload',
                data:{
                    name:file_upload.name,
                    mimetype:file_upload.mimetype,
                    size:file_upload.size
                }
            })
        }
    }catch(err){
        res.status(500).send(err);
    }
});

app.get('/third-party-api', async (req,res) => {
    try{
        const response = await axios({
            url:'http://universities.hipolabs.com/search?country=United+States',
            method:'get',
        });
        res.status(200).json(response.data[1].name);
    }catch(err){
        res.status(500).json({message:err});
    }
});



nexmo.message.sendSms(
    '918669086100', '918669086100', 'HI SMS completed working on AWS and login signup operation in nodejs',
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
app.listen(3000);
