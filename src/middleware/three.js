const three=function(req,res,next){
    console.log("three called")
//this is most inprtant paprt 
//middleware always calls next fnction 
//rather then giving response
next();
}
module.exports=three;