const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
module.exports = async function main() {
    try {
        await mongoose.connect("mongodb://localhost:27017/data", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connect to DB!');
      } catch (error) {
        console.log('Error connecting to DB: ', error);
      }
};
