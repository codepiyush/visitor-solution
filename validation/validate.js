const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateVisitor = data => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : ''
    data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : ''

    if(isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if(isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    else if (!validator.isEmail(data.email)) {
        errors.email = "Please Enter a valid email address";
    }

    if(isEmpty(data.mobileNo)) {
        errors.mobileNo = 'Number field is required'
    }

    return ({
        errors,
        isValid: isEmpty(errors)
    })
}

const validateHost = data => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : ''

    if(isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if(isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    else if (!validator.isEmail(data.email)) {
        errors.email = "Please Enter a valid email address";
    }

    return ({
        errors,
        isValid: isEmpty(errors)
    })
}
const validate = {
    validateVisitor,
    validateHost
}
module.exports = validate
