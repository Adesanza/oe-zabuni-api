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
                const billboard = await Billboard.create(req.body);
                return res.json({billboardData: billboard});
            } catch (error) {
                // console.log(error);
                next(error);
            }
        })        

router
    .route("/:id")
        .get(async(req,res,next) => {
            try {
                const billboard = await Billboard.findById(req.params.id);
                return res.json({billboardData: billboard});
            } catch (error) {
                // console.log(error);
                next(error);
            }
        })   
        .patch(async(req,res,next) => {
            try {
                const billboard = await Billboard.findByIdAndUpdate(req.params.id,req.body,{runValidators: true, new: true});
                return res.json({billboardData: billboard});
            } catch (error) {
                // console.log(error);
                next(error);
            }
        })   
        .delete(async(req,res,next) => {
            try {
                const billboard = await Billboard.findByIdAndRemove(req.params.id);
                return res.json({billboardData: billboard});
            } catch (error) {
                // console.log(error);
                next(error);
            }
        })   


module.exports = router;