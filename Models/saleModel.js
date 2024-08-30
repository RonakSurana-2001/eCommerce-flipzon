const mongoose=require("mongoose")

const saleModel=new mongoose.Schema({
    saleId:String,
    itemId:String,
    quantity:Number,
    startTime:Date,
    endTime:Date,
    status:{
        type:String,
        enum:['active','inactive','completed']
    }
})

module.exports=mongoose.model('sales',saleModel)