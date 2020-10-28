import express from 'express';
import Company from '../models/companymodel';
const router=new express.Router();

router.post('/register',async (req,res)=>{
    const company=await Company(req.body);
    try {
        await company.save();
        req.session.company=company;
        
        res.status(201).send("your company added ");

    } catch (error) {
        res.status(400).send(error);
    }
});
router.post('/login',async (req,res)=>{
    try {
        const company=await Company.findByCredentials(req.body.username,req.body.password)
        if (company) {
            req.session.company=company;
            res.status(200).json({message:"you'r login "})
        }
        else{
            res.status(400).json({message:"this acciunt is not exist"})
        }
       
    } catch (error) {
        res.status(400).send(error);
    }
});
router.post('/logout', (req,res)=>{
    if (req.session) {
        req.session.destroy(error=>{
            if (error) {
                res.status(500).json({message:"you gotta check  somthings"});
            }else{
                res.status(200).json({message:"logout"});

            }
        })
    } else {
        res.status(200).json({message:"you wanna kidding me "});
        
    }
});
export default router;