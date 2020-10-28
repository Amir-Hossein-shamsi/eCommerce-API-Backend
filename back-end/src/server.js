import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from '../database/mongoose';
import company_routes from '../routes/companyroutes';
import product_routes from '../routes/itemsroutes';
import auth from '../middleware/auth-routers';
import restricted from '../middleware/restricted';


const app=express();
mongoose();
const sessioConfig={
    name:"ecommerce-cookie",
    secret:process.env.SECRETSESSION,
    cookie:{
        maxAge:1000*60*60*2,
        secure:false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessioConfig));
app.use('/api/auth',auth);
app.use('/api/company',restricted,company_routes);
app.use('/api/product',restricted,product_routes);
export default app;