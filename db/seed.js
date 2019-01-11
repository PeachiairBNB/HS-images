var db = require('../db/index.js')
var faker = require('faker');

// These are 20 static images files to use for each of the 100 Airbnb listings
const sampleStaticData = ['file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/1.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/2.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/3.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/4.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/5.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/6.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/7.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/8.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/9.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/10.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/11.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/11.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/12.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/13.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/14.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/15.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/16.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/17.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/18.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/19.jpeg',
'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/20.jpeg']

let listingData = [];
let imageData = [];

let creationCounter = 0; 
let adderNum = 62500;
let max = 62500;
let imageMax = 1000;
// This fn will create 100 listing objs with an arr of 8-10 image objs
// const createMockData = () => {
//     listingData = [];
//     imageData = [];
//     This loop will create 100 listing objs
//     console.log('the counter and max are: ', creationCounter, max)
//     for (var i = creationCounter; i < max; i++) {
//         let id = i;
//         // This loop will generate 8-10 images objs for ea listing
//         let randomNum = Math.floor(Math.random() * 3) + 8;
//         let listing = {
//             id: id,
//             count: randomNum
//         }
//         listingData.push(listing);
//     }
//     for(let i = 0; i < imageMax; i++){
//         let url = sampleStaticData[Math.floor(Math.random() * Math.floor(20))];
//         let caption = faker.lorem.sentence();
//         let imageObj = {
//             // Listing_id points to the listing it belongs to
//             listing_id: i,
//             image_url: url,
//             image_caption: caption,
//         }
//         imageData.push(imageObj);
//     }
// };
// createMockData(creationCounter, max);


// Run this function once to load the mockData into mongoDB.
const loadListingCollection = () => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        // This loop will create 100 listing objs
        let randomNum = Math.floor(Math.random() * 3) + 8;
        console.log('the counter and max are: ', creationCounter, max)
        for (var i = creationCounter; i < max; i++) {
            data = new db.Listing({
                id: i,
                count: randomNum
            })
            listingArray.push(data);
            creationCounter++;
        }
        data.collection.insertMany(listingArray, (err, data) => {
            if (err) {
                console.log('Could not save listing data', err);
            } else if(creationCounter < 10000000){
                max += adderNum;
                console.log('entered: ', creationCounter, ' data points so far!');
                // createMockData();
                adder();
            } else {
                console.timeEnd('timer');
                console.log('stopping');
            }
        })
    }
    console.time('timer');
    adder();
};
const loadImageCollection = () => {
    let imageArray = [];
    let data;

    for (var i = 0; i < imageMax; i++) {
        // console.log(imageData[0].id)
        let url = sampleStaticData[Math.floor(Math.random() * Math.floor(20))];
        let caption = faker.lorem.sentence();
        data = new db.Image({
            id: i,
            image_url: url,
            image_caption: caption
        })
        imageArray.push(data);
    }
    console.time('imageSave')
    data.collection.insertMany(imageArray, (err, data) => {
        if (err) {
            console.log('Could not save image data', err);
        } else {
            console.timeEnd('imageSave');
            console.log('Image data has been saved.')
        }
    })
};

loadListingCollection();
// loadImageCollection();