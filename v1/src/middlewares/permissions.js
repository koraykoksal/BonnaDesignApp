"use strict"


module.exports = {

    isLogin:(req,res,next)=>{

        if(req.user && req.user.isActive){
            next()
        }
        else{
            res.errorStatusCode = 403
            throw new Error('No Permission ! You must be Login')
        }
    },
    isController: (req, res, next) => {


        if (req.user && req.user.isActive && req.user.isController) {

            next()
        }
        else {
            res.errorStatusCode = 403
            throw new Error('No Permission ! You must be Controller role')
        }


    },
    isAdmin: (req, res, next) => {

        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        }
        else {
            res.errorStatusCode = 403
            throw new Error('No Permission ! You must be Admin role')
        }
    }

}