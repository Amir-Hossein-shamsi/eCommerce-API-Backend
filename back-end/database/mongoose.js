import mongoose from 'mongoose';

const set_mongoose=()=>{
    const mongoURl=process.env.MONGO_URL;
    mongoose.connect(mongoURl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    
});
};
export default set_mongoose;
