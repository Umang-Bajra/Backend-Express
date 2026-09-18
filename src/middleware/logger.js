const logger=function(req,res,next){
    console.log("logger called")
//this is most inprtant paprt 
//middleware always calls next fnction 
//rather then giving response
next();
}
module.exports=logger;