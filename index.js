const express=require("express")
const app=express()
const cors=require("cors")
const dotenv=require("dotenv")
const connectToDb=require("./db/db.js")
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerDocs');

const PORT=3000 || process.env.PORT

dotenv.config()
app.use(express.json())
app.use(cors())
connectToDb()

app.get("/",(req,res)=>{
    res.send("Intial Route")
})

app.use("/api",require("./Routes/sale_purchase_route"))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT,()=>{
    console.log(`Backend is running on PORT ${PORT}`)
})