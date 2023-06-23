const mongoose = require('mongoose');

(async function connect() {
  try {
    await mongoose.connect('mongodb+srv://vercel-admin-user:Raj8896@cluster0.dinpclz.mongodb.net/Foodie', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    const collection = await mongoose.connection.db.collection('food_items');
    const coll2 = await mongoose.connection.db.collection('foodCategory');
    const data = await collection.find({}).toArray();
    const catData = await coll2.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
    console.log(global.foodCategory);
  } catch (error) {
    console.error('Connection Error:', error);
  }
})();

module.exports = mongoose.connection;
