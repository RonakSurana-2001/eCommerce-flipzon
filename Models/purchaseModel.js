const mongoose=require("mongoose")

const purchaseSchema=new mongoose.Schema({
    purchaseId:String,
    saleId:String,
    userId:String,
    quantity:Number,
    status:{
        type:String,
        enum:['success','failed']
    },
    timestamp:Date
})

module.exports=mongoose.model('purchases',purchaseSchema)