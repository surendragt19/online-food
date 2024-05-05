const express=require('express')
const router=express.Router()

router.post('/foodData',(req,res)=>{
    try {
        console.log(global.food_items)
        console.log(global.foodCategoryItems)
        res.send([
            global.food_items,
            global.foodCategoryItems
        ]);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Eroor")
    }
})
module.exports=router