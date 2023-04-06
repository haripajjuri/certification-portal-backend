const express = require('express')
const router = express.Router()
const user = require('../model/user')

router.post('/register',async(req,res)=>{
    
  //  console.log(req.body.send.username)

    let users;
    try{
        users = new user({
            username:req.body.username,
            password:req.body.password
        })
        users.save()

    }catch(err){
        console.log(err)
    }

    if(!users){
        return res.status(500).json({msg:"something went wrong"})
    }
    return res.status(200).json({users})
})






router.get('/getAlldata',async(req,res)=>{
    let allusers = await user.find();
    return res.status(200).json({allusers})
    console.log(allusers);
})



router.post('/login',async (req,res)=>{
    const user1 = await user.findOne({username:req.body.username})
    if(user1){
        const result = req.body.password === user1.password
        if(result){
            res.json({msg:"login accepted"})
        }else{
            res.json({msg:"password didnt match"})
        }
    }else{
        res.json({msg:"user not found"})
    }
})


router.get('/', function(req, res){
    res.send("Hello !");
 });

module.exports = router;