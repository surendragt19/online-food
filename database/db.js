const mongoose = require('mongoose');

const MongoURL = "mongodb+srv://surendragt07:NDVWl2RWGLEtiw7s@cluster0.umxbpyc.mongodb.net/onlineFood?retryWrites=true&w=majority&appName=Cluster0";

const connectionDB = async () => {
    try {
        await mongoose.connect(MongoURL);
        console.log("Connection Success");

        //Fetch Data
        

    const fetch_data=await mongoose.connection.collection("foodData")
    const F_data=await fetch_data.find({}).toArray()
    global.food_items=F_data;


    const foodCategory=await mongoose.connection.collection("foodCategory")
    const allData=await foodCategory.find({}).toArray()
    global.foodCategoryItems=allData;
   
   

       

    } catch (error) {
        console.error("Connection Error:", error);
    }
};

module.exports=connectionDB
