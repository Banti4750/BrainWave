import mongoose, { model, Schema } from 'mongoose';


const userSchema = new Schema(
    {
        username:{type:String , required:true , unique:true},
        email:{type:String , required:true , unique:true},
        password:{type:String , required:true }
    }
)




const contenSchema = new Schema(
    {
       title:{type:String , required:true},
       link:{type:String , require:true},
       type: String,
       tags:[{type:mongoose.Types.ObjectId , ref:'Tag'}],
       userId:{type:mongoose.Types.ObjectId , ref:'users' , required:true},

    }
)

const LinkSchema = new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId , ref:'users' , required:true  , unique:true}

})


const userModel = mongoose.model('users' , userSchema);
const contentModel= mongoose.model('Content' , contenSchema)
const LinkModel = mongoose.model('Links' ,LinkSchema )

 export { userModel, contentModel  , LinkModel};

