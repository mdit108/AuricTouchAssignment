const {DataSchema} = require('./data.schema')

const getData = _id => {
    return new Promise((resolve,reject)=> {
        try {
            DataSchema.find({}).distinct('operator').then(data => {
                resolve(data)
            }).catch((error)=>reject(error));
        } catch (error) {
            reject(error);
        }
    })
}

const getTypeData = operator1 => {
    return new Promise((resolve,reject)=>{
        try {
            DataSchema.find({operator:operator1}).distinct('operatorGameType').then(data=>{
                resolve(data)
            }).catch((error)=>reject(error));
        } catch (error) {
            reject(error)
        }
    })
}
const getNameData = (operator1,operator2) => {
    return new Promise((resolve,reject)=>{
        try {
            DataSchema.find({operator:operator1,operatorGameType:operator2}).select({operatorName:1,_id:0}).then(data=>{
                resolve(data)
            }).catch((error)=>reject(error));
        } catch (error) {
            reject(error)
        }
    })
}
const getPlayerData = (operator1,operator2,operator3) => {
    return new Promise((resolve,reject)=>{
        try {
            DataSchema.find({operator:operator1,operatorGameType:operator2,operatorName:operator3}).select({dfsSlatePlayers:1}).then(data=>{
                resolve(data)
            }).catch((error)=>reject(error));
        } catch (error) {
            reject(error)
        }
    })
}



module.exports={
    getData,
    getTypeData,
    getNameData,
    getPlayerData
}