import express from 'express';
import Product from '../models/productmodels';
//import auth from '../middleware/auth';

const router=new express.Router();


router.post('/add',async (req,res)=>{
    const product=new  Product({...req.body,owner:req.session.company._id});
    try {
        await product.save();
        res.status(201).send("Product added ");

    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/itemsAll',async (req,res)=>{
    const products={};
    try {
        const items=await Product.find({owner:req.session.company._id});
        if (!items) {
            return res.status(404).send(`Dear ${req.session.company.username},you have not any items in your repository`)
        }
       // items.forEach((item)=>products.concat(item));
        res.status(200).send(items.toString());
    } catch (error) {
     res.status(500).send(error);
        
    }
 });



router.get('/item/:id',async (req,res)=>{
   const _id=req.params.id;
   try {
       const item=await Product.findOne({_id,owner:req.session.company._id});
       if (!item) {
           return res.status(404).send(`Dear ${req.session.company.username}, this item not found in your collection`)
       }
       res.status(200).send(item.toString());
   } catch (error) {
    res.status(500).send(error);
       
   }
});
router.patch('/update/:id',async (req,res)=>{
    
    const updates=Object.keys(req.body);
    const  allowedUpdates=['name','brand','catagory','countInStock','description','price'];
    const isValid=updates.every((update)=>allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error:'invalid updates'});
    }
    try {
        const product=await Product.findOne({_id:req.params.id,owner:req.session.company._id});
        updates.forEach((update)=>product[update]=req.body[update]);
        await product.save();
        res.status(200).send("is done");  
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id',async (req,res)=>{
    try {
        const product =await Product.findByIdAndDelete({_id:req.params.id,owner:req.session.company._id});
        if (!product) {
            res.status(404).json({message:"this item not found in your repositiry pls check it"})
        }
        res.status(200).send(`Dear ${req.session.company.username} your item with ${req.params.id} ID deleted `);
    } catch (error) {
        res.status(500).send(error);
    }
});


export default router;