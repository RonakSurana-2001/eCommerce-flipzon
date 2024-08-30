const express=require("express")
const router=express.Router()
const {createSale,getSale,purchaseItem,getPurchase}=require("../Controllers/purchase_sale_controller")

router.post("/flashsales",createSale)
router.get("/flash-sales/:saleId",getSale)
router.post("/purchases",purchaseItem)
router.get("/purchases/:purchaseId",getPurchase)

module.exports=router