const mongoose=require('mongoose')

let M_Schema= mongoose.Schema

const todoSchema=new M_Schema(
    {
        moviename:String,
        actor:String,
        director:String, 
        review:String
        
    }
)


var todomodel=mongoose.model("todos",todoSchema)
module.exports={todomodel}