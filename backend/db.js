const mongoose = require('mongoose');

(async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/foodie');
    console.log('Connected to database');
    
    const collection = await mongoose.connection.db.collection('food_items');
    const coll2 = await mongoose.connection.db.collection('foodCategory');
    const data = await collection.find({}).toArray();
    const catData = await coll2.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
    // console.log(global.foodCategory);
    
  } catch (error) {
    console.error('Connection Error', error);
  }
})();

module.exports = mongoose.connection;