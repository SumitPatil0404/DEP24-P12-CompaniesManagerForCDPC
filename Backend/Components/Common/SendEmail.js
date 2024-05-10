const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs')
const DB=require('../DataBase/SQLDatabase')
const {sendEmailWithDomain}=require('../Notifiers/EmailNotifier')
const router=express()

router.post('/sendotp',async (req,resp)=>
{
    try
    {
        let otp=req.body.otp
        let email=req.body.email
        let subject=`OTP Verification`
        let body=`Your otp for verification is ${otp}`
        let domain=`noreply@dep24.com`
        // await sendEmailWithDomain(email,subject,body,domain)
        resp.send({
            ok:true
        })

    }
    catch(err)
    {
        resp.send({
            ok:false
        })
    }
    
})


module.exports = router