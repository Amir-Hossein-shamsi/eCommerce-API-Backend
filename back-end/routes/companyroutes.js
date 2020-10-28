import express from 'express';
import Company from '../models/companymodel';
// import auth from '../middleware/auth';

const router=new express.Router();


router.get('/show',async (req,res)=>{
     console.log('req.session.company', req.session.company)
     res.status(200).send(req.session.company.email);

});
router.patch('/update',async (req,res)=>{
    
    const updates=Object.keys(req.body);
    const  allowedUpdates=['nameCompany','founder','email','username','password','avatar'];
    const isValid=updates.every((update)=>allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error:'invalid updates'});
    }
    try {
        updates.forEach((update)=>req.session.company[update]=req.body[update]);
        const company=await Company.findByIdAndUpdate(req.session.company._id,req.session.company);
        await company.save();
        res.status(200).send("is done");  
    } catch (error) {
        res.status(400).send(error);
    }
});
router.delete('/delete',async (req,res)=>{
    try {
        const company= await Company.findById(req.session.company._id);
        await company.remove();
        req.session.destroy(error=>{
            if (error) {
                res.status(500).json({message:"you gotta check  somthings"});
            }else{
                res.status(200).json({message:"deleted session and company"});
            }
        })
    } catch (error) {
        res.status(500).json({message:"deleting this account is not never gonna happend "});
        
    }
});


export default router;
