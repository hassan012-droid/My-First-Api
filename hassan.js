const mongoose=require("mongoose")
if(process.argv.length < 3){
    console.log(`give password as argument`)
    process.exit(1)
}

const password=process.argv[3]
const url=`mongodb+srv://admin2:${password}@hassandb.x1jh4vx.mongodb.net/mayor?retryWrites=true&w=majority&appName=hassandb`
mongoose.set("strictQuery", false)
mongoose.connect(url, {family:4})

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
// const tableOne=new HassanModule({
//     name: "Samuel",
//     important: true
// })

// tableOne.save()
// .then((response)=>{
//     console.log(response)
//     mongoose.connection.close()
// }).catch (function(error){
//     console.log(error)
// })
HassanModel.find({
    important: true
}).then((response)=>{
    console.log(response)
    mongoose.connection.close()
})
    .catch(error=>console.log(error))