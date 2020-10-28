import server from './server';

const port=process.env.PORT;


server.listen(port,()=>{
    console.log(`server is Up on ${port}`);
});