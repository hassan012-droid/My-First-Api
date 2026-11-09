const express= require("express")
const app= express()
const cors=require("cors")
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
    return response.send(db)
})

app.get("/api/Hassan/:count", function(request,response){
    const getId= request.params.count
    const getElement=db.filter((elements,idx)=>idx===Number(getId))
    return response.send(getElement)
})

app.delete("/api/Hassan/delete/:count",(request,response)=>{
    const getId=Number(request.params.count)
    const newNote=db.filter((elements, idx)=>idx !==getId)
    return response.status(200).send({
        "myMessage": "how are u doing",
        "deleteResponse": newNote
    })
})

app.post("/api/Hassan",(request,response)=>{
    const clientRequest=request.body
    const getId=db.length+1
    const getImportance=Math.random<0.5
    const newObj={
        id: getId,
        importance: getImportance,
        name:clientRequest.name
    }

    const newdb=db.concat(newObj)
    console.log(clientRequest)
    return response.status(200).send(newObj)
    

    // return response.status(201).send({"clientResponse":clientRequest})
})

const PORT=process.env.PORT || 3001
app.listen(PORT, function(){
    console.log(`Server running on port ${PORT}`)
})