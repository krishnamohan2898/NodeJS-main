const  express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const {todomodel}=require('./model')



let app=express()
app.use(bodyparser.urlencoded({extended:true})) 
app.use(bodyparser.json())


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

mongoose.connect("mongodb+srv://Rajitha:renju@cluster0.qmdvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


app.get('/',(req,res)=>{
    res.send("Welcome.................")
})


app.post('/add',async(req,res)=>{

    try{
    console.log(req.body)
    let todo=new todomodel(req.body)
    let result=await todo.save()
    res.json(result)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})


app.post('/update',async(req,res)=>{
    try{
        var result=await todomodel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"Sucessfully Updated"})
    }
    catch(error)
    {
        res.status(500).json({"status":error})
    }
})

app.get('/view',async(req,res)=>{
    try{
        var result=await todomodel.find()
        res.json(result)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

app.post('/search',async(req,res)=>{
    try{
        var result=await todomodel.find(req.body)
        res.json(result)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})


app.post('/delete',async(req,res)=>{
    try{
        var result=await todomodel.findByIdAndDelete(req.body)
        res.json({"status":"Sucessfully Deleted"})
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})





app.listen(5001,()=>{
    console.log("Running")
})

