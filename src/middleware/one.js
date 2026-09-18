const one=function(req,res,next){
    console.log("one called")
//this is most inprtant paprt 
//middleware always calls next fnction 
//rather then giving response
next();
}
module.exports=one;