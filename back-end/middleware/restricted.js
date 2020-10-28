const resricted=(req,res,next)=>{
if (req.session && req.session.company) {
    next();
} else {
    res.status(401).json({message:"you gotta go to login page and authatication "});
}
};



export default resricted;