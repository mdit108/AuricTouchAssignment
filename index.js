const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const { homePage } = require('./controllers/userController');
const { getData, getTypeData, getNameData,getPlayerData } = require('./models/data.model');
const ans = mongoose.connect('mongodb://localhost/assignment');
const mDb = mongoose.connection;
mDb.on("open",()=>{
  console.log("Mongo DB is connected")
})
mDb.on("error",(error)=>{
  console.log(error)
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/operator',async(req,res,next)=>{

    try{
        const _id = "6127d7e71e5f89d0faa9982d"
        const data = await getData(_id)
        return res.json({status:'success',data})
    }
    catch(error){
        res.json({status:'error',message:'Error'})
    }

    res.json({status:'success',message:'work done'})
})


app.get('/operatorGameType/:operator',async(req,res,next)=>{

    try{
        const result = await getTypeData(req.params.operator)
        return res.json({status:'success',result})
    }
    catch(error){
        res.json({status:'error',message:'Error'})
    }

    res.json({status:'success',message:req.params.operator})
})

app.get('/operatorName/:operator/:operatorGameType',async(req,res,next)=>{

    try{
        const result = await getNameData(req.params.operator,req.params.operatorGameType)
        return res.json({status:'success',result})
    }
    catch(error){
        res.json({status:'error',message:'Error'})
    }

    res.json({status:'success',message:req.params.operator})
})

app.get('/players/:operator/:operatorGameType/:operatorName',async(req,res,next)=>{

    try{
        const result = await getPlayerData(req.params.operator,req.params.operatorGameType,req.params.operatorName)
        let reducedResult = [];
        result[0].dfsSlatePlayers.forEach(element => {
          console.log(element.operatorPlayerName)
          let obj = {
            playerName: element.operatorPlayerName,
            playerPoints: element.fantasyPoints,
            playerPosition: element.operatorPosition,
            playerTeam: element.team,
            playerSalary: element.operatorSalary,
          }
          reducedResult.push(obj);
        });
        return res.json({status:'success',reducedResult})
    }
    catch(error){
        res.json({status:'error',message:'Error'})
    }

    res.json({status:'success',message:req.params.operator})
})

app.get('/',homePage);

app.listen(3000, () => console.log('Server is runngin on port 3000'));