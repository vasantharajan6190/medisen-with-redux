const express =require("express")
const cors = require("cors")
const app = express()
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 5000
const db = require("./config/db")
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(fileUpload())
db.authenticate()
.then(res=>console.log("database connected"))
.catch(err=>console.log(err))
app.use("/",require("./routes/index"))

app.listen(port,()=>{
    console.log(`server started at ${port}`)
})