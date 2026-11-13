const mongoose=require("mongoose")
const password=process.argv[2]
console.log(process.argv)
const url=process.env.MONGODB_URI
mongoose.set("strictQuery", false)
mongoose.connect(url,{family: 4})
.then((result)=>{
    console.log("connected to mongoDB")
}).catch((error)=>{
    console.log("error", error)
})
const hassanSchema=new mongoose.Schema({
    name: String,
    importance: Boolean
})

hassanSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const HassanModel=mongoose.model("firstTable", hassanSchema)
module.exports=HassanModel