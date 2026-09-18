const hellomiddleware=function(req,res,next){
    console.log("hellowrld called");;
    next();
}
module.exports=hellomiddleware