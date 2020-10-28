import mongoose from 'mongoose';


const productSchema=new mongoose.Schema({
    name:{type:String,trim:true,required:true,lowercase:true,},
    owner:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Company'},
    image:{type:Buffer,required:true},
    brand:{type:String,required:true,trim:true,lowercase:true},
    catagory:{type:String,default:'undefined',trim:true,lowercase:true},
    countInStock:{type:Number,required:true},
    description:{type:String,default:'this is a description of the product',trim:true,lowercase:true},
    rating:{type:Number,default:0},
    price:{type:String,required:true,trim:true}



    
},{timestamps:true});
const Product=mongoose.model('Product',productSchema);
export default Product;
