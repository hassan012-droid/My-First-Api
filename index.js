require("dotenv").config()
const express= require("express")
const app= express()
const cors=require("cors")
const firstTable = require("./module/firstTable")

const requestLogger=(request, response, next)=>{
    console.log(`Method:`, request.method)
    console.log(`Path:`, request.path)
    console.log(`Body:`, request.body)
    console.log("---")
    next()
}
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
const db=[
    
        {
            "id":1,
            "importance":true,
            "name":"Mike"
        },
        
        {
            "id":2,
            "importance":false,
            "name":"Samuel"
        },

        {
            "id":3,
            "importance":true,
            "name":"Tobi"
        }

    ]

app.get("/", function(request,response){
    return response.send("Hello World")
})

app.get("/api/Hassan", function(request,response){
    const getAllDoc=firstTable.find({}).then(function(result){
         return response.send(result)
    })
    .catch(function(error){
        console.log(error)
    })
   
})

app.get("/api/Hassan/:count", function(request,response,next){
    // const getId= request.params.count
    // const getElement=db.filter((elements,idx)=>idx===Number(getId))
    // return response.send(getElement)
    firstTable.findById(request.params.count)
    .then(result=>{
        if(result){
            return response.status(200).send(result)
        }
        else{
            return response.status(404).send({error: "Document not found"})
        }
    }).catch(error=>next(error))
})



app.delete("/api/Hassan/delete/:count",(request,response)=>{
    const getId=Number(request.params.count)
    const newNote=db.filter((elements, idx)=>idx !==getId)
    return response.status(200).send({
        "myMessage": "how are u doing",
        "deleteResponse": newNote
    })
})

app.post("/api/Hassan",(request,response,next)=>{
    const clientRequest=request.body
    const getId=db.length+1
    const getImportance=Math.random()<0.5
    const newObj={
        ...clientRequest,
    }

    const newdb=db.concat(newObj)
    console.log(clientRequest)
    firstTable.insertOne(newObj).then(function(result){
         return response.status(200).send(result)
    })
    .catch((error)=>next(error))

    // return response.status(201).send({"clientResponse":clientRequest})
})

app.put("/api/Hassan/:count", async(req,res,next)=>{
    const id=req.params.count
    const getDoc=await firstTable.findById(id)
    if(!getDoc){
        return res.status(404).send({error: "documents not found"})
    }
    console.log(!getDoc.importance, getDoc.importance)
    firstTable.updateOne(
        {_id: {$eq: id}},
        {$set: {
            importance: !getDoc.importance
        }}
    ).then(async result=>{
        const mainResult=await firstTable.findById(id)
        return res.status(201).send(mainResult)
    })
    .catch(error=>next(error))
})

const unknownEndpoint=(request, response)=>{
    return response.status(404).send({error: "unknown endpoint"})
}
const errorHandler=(error, request, response, next)=>{
    console.log(error.message)
    if(error.name==="CastError"){
        return response.status(400).send({error: "malformatted id"})
    }
    else if(error.name==="ValidationError"){
        return response.status(400).json({error: error.message})
    }
    next(error)
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT=process.env.PORT || 3001
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
})