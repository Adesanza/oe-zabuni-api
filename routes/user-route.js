const User = require("../models/user-model");

const router = require("express").Router();



router
    .route("/admin/create")
        .post(async(req,res,next) => {
            try {
                const user = await User.create({
                    ...req.body   
                })
                return res.json({message: "Successfully created admin"});
            } catch (error) {
                // console.log(error);
                next(error)
            }
        })




module.exports = router;