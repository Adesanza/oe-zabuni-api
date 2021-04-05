const Billboard = require("../models/billboard-model");

const router = require("express").Router();



router
    .route("/all")
        .get(async(req,res,next) => {
            try {
                return res.json({billboardData: await Billboard.find()});
            } catch (error) {
                // console.log(error);
                next(error)
            }
        })
router
    .route("/create")
    .post(async(req,res,next) => {
        try {
            const billboard = await Billboard.create({
                ...req.body
            });
            return res.json({billboardData: billboard});
        } catch (error) {
            // console.log(error);
            next(error);
        }
    })        




module.exports = router;