const saleModel = require("../Models/saleModel")
const purchaseSchema = require("../Models/purchaseModel")
const mongoose = require('mongoose');

const createSale = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const sale = new saleModel(req.body)
        sale.saleId = new mongoose.Types.ObjectId().toString()
        await sale.save({session})
        await session.commitTransaction();
        session.endSession();
        res.status(201).send({
            success: true,
            message: "Item Added for sale",
            sale
        })
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({
            success: false,
            message: "Server Side Error"
        })
        console.log(err)
    }
}

const getSale = async (req, res) => {
    const sale = await saleModel.findOne({ saleId: req.params.saleId });
    if (!sale) {
        return res.status(404).json({
            success: false,
            message: 'Sale not found'
        });
    }
    res.status(201).send({
        success: true,
        sale
    });
}

const purchaseItem = async (req, res) => {
    const { saleId, userId, quantity } = req.body

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        const sale = await saleModel.findOne({ saleId })
        if (!sale || sale.status !== 'active') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({
                message: "Sale not active"
            })
        }
        if (sale.quantity < quantity) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Not enough stock' });
        }
        sale.quantity -= quantity;
        await sale.save({session});
    
        const purchase = new purchaseSchema({
            purchaseId: new mongoose.Types.ObjectId().toString(),
            saleId,
            userId,
            quantity,
            status: 'success',
            timestamp: new Date()
        })
        await purchase.save({session})

        await session.commitTransaction();
        session.endSession();
    
        res.status(201).send({
            success: true,
            message: "successfully purchased",
            purchase
        })
    } catch(error){
        await session.abortTransaction();
        session.endSession();
        console.error('Transaction failed:', error);
        res.status(500).send({message:"Internal Server Error"})
    }

}

const getPurchase=async(req,res)=>{
    const purchase=await purchaseSchema.findOne({purchaseId:req.params.purchaseId})
    if(!purchase){
        return res.status(404).json({ success:false,message: 'Purchase not found' });
    }
    res.status(201).send(purchase)
}

module.exports = { createSale, getSale, purchaseItem , getPurchase}