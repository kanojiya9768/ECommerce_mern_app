require('dotenv').config();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb+srv://kanojiyavishal:UjC0CDHdZA6DX21W@ecommerce.mmleigl.mongodb.net/ProductManager');      //used for local system system
  await mongoose.connect(process.env.MONGO_APPLICATION_URL)
  console.log("database connected");
}



const ProductSchema = new mongoose.Schema({
  title: {type : String , required : true , unique: true},
  description: {type : String , required : true , unique: true},
  price: {type : String , required : true},
  discountPercentage: {type : String , required : true },
  rating: {type : String , required : true },
  stock: {type : String , required : true },
  brand: {type : String , required : true },
  category: {type : String , required : true },
  thumbnail: {type : String , required : true , unique: true},
});


exports.product = mongoose.model('product', ProductSchema);
exports.cart = mongoose.model('cart', ProductSchema);


