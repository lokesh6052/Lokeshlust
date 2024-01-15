const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/Lokeshlust";

main()
    .then(() => {
        console.log("Connection is working successfully");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:'65a21e4c9a9286a1eddf5986'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized!  ✅");
};

initDB();