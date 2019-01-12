var db = require ('../db/index.js');

let findListingByID = (listingID) => {
    return db.Listing.find({
        id: listingID
    }).exec();
};

// let findAllImages = (callback) => {
//     db.Image.find({}, callback)
// };

// let findImagebyID = (listingID) => {
//     return db.Image.find({
//         id: listingID
//     }).exec();
// };

module.exports = {findListingByID}    