

const user = {
     newuser :  async(req,res,next) =>{
      
        Promise.all([
            passval(req.body.password),
            firstnameval(req.body.firstname),
            lastnameval(req.body.lastname)

        ]).then(()=>{
            next();
        }).catch((err)=>{
            
            res.status(400).send({error: err.message})
        })
    }
}

const firstnameval = (firstname)=>{
    if(firstname == undefined)
    return Promise.reject(new Error('firstname is required'))
    return Promise.resolve(true)
}
const lastnameval = (lastname)=>{
    if(lastname == undefined)
    return Promise.reject(new Error('lastname is required'))
    return Promise.resolve(true)
}

const passval = (password)=>{
    if(password == undefined ||password.length<8)
    return Promise.reject(new Error('short password'))
    if(includenum(password)===null || letter(password)===null)
    return Promise.reject(new Error('Pass val fail'))
    return Promise.resolve(true)
    
}
const includenum = (password)=>{
    const res =  /\d/.test(password);
    if(res==true)
    return res;
    return null;
 }
 const letter = (password)=>{
         for(let i = 0; i<password.length; i++){
             if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&& password.charAt(i)==password.charAt(i).toUpperCase()){
             for(let i = 0; i<password.length; i++){
                 if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&&password.charAt(i)==password.charAt(i).toLowerCase()){
             return true
                 }
             }
             return null
         }
         }
         return true
     }
 module.exports= user;