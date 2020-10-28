import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import Product from './productmodels';


const companySchema=new mongoose.Schema({
    nameCompany:{type:String,required:true,trim:true},
    founder:{type:String,required:true,lowercase:true,trim:true},
    email:{unique:true,type:String,required:true,trim:true,lowercase:true,validate(x){
        if (!validator.isEmail(x)) {
            throw new Error('Email is not Valid');
        }
    }},
    establishe_date:{type:Date,min: '1900-09-28', default:Date.now,},
    username:{type:String,trim:true,required:true,validate(x){
        if (!validator.isLength(x,[{min:2,max:undefined}])) {
            throw new Error('your username must be more than 2 character');
        }
    }},
    password:{type:String,required:true,minlength:7,trim:true,validate(x){
        if (x.toLowerCase().includes('password')) {
            throw new Error('password cannot contain "password"');
        }
    }},
    avatar:{
        type:Buffer
    }

},{Timestamp:true});

companySchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'owner'

});
companySchema.methods.toJSON=function () {
    const company=this;
    const companyObject=company.toObject();

    delete companyObject.password;
    delete companyObject.avatar;
    return companyObject;


};
companySchema.statics.findByCredentials=async (username,password)=>{
    const company=await Company.findOne({username});
    if (!company) {
        throw new Error('unable to login ');
    }
    const isMatch=await bcrypt.compare(password,company.password);
    if (!isMatch) {
        throw new Error('unable to login ');
        
    }
    return company;


};
companySchema.pre('save', async function (next) {
    const company=this;
    if (company.isModified('password')) {
        company.password=await bcrypt.hash(company.password,8);
    }
    next();
  });


companySchema.pre('remove', async function (next) {
    const company=this;
    await Product.deleteMany({owner:company._id});
    next();
  });


  const Company =mongoose.model('Company',companySchema);
  export default Company;
