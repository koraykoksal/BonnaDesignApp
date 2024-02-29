"use strict"


module.exports = {


    isController: (req, res, next) => {

        if (req.user && req.user.isController) {
            next()
        }
        else {
            res.errorStatusCode = 403
            throw new Error('No Permission ! You must be controller role')
        }
    },
    isAdmin: (req, res, next) => {

        if (req.user && res.user.isAdmin) {
            next()
        }
        else {
            res.errorStatusCode = 403
            throw new Error('No Permission ! You must be controller role')
        }
    }

}