const validator = require('validator')

const Validate = (data)=>{
    const mandatoryFields = ['firstName','emailId', 'password']
    const isAllowed = mandatoryFields.every((k)=>Object.keys(data).includes(k))
    if(!isAllowed)
        throw new Error("Fields Missing")
    if(!validator.isEmail(data.emailId)){
            throw new Error("Invalid Email")
        }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password")
    }
    if((data.firstName.length<=3 || data.firstName.length>=40)){
        throw new Error("Name should be between 2-40 characters")
    }
}

module.exports=Validate;