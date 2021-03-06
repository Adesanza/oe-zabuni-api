const mongoose = require("mongoose");
const config = require("config");
//connect to mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
if(process.env.NODE_ENV == "production"){
    mongoose.connect(config.get("database.mongoDatabaseAtlas"))
    .then(()=>console.log("MongoDbAtlas is hot"))
    .catch(err=>console.log("Err..looks like something broke @mongoAtlas",err.message));
}else{
    mongoose.connect(config.get("database.mongoDatabaseLocal"))
    .then(()=>console.log("MongoDb-Local is hot"))
    .catch(err=>console.log("Err..looks like something broke",err.message));
}