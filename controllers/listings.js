const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListings = async(req,res) =>{
    let { id }  = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate : { path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.createListings = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing created! ");
    res.redirect("/listings");
}

module.exports.editListings = async(req,res) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs",{ listing , originalImageUrl });
}

module.exports.updateListings = async(req,res)=>{
    let { id } = req.params;
    let updateData = req.body.listing;
    let updatedListing = await Listing.findByIdAndUpdate(id, updateData);

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${updatedListing._id}`);
}

module.exports.destroyListings = async(req,res)=>{
    let { id } = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    console.log(deletedItem);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}