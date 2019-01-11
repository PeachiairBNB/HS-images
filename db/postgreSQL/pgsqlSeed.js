const pg = require('pg');
const connection = process.env.DATABASE_URL || 'postgres://localhost:5432/helensCarousel';
const client = new pg.Client(connection);
client.connect();



// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         port: '5433',
//         user: 'AustinJoo',
//         database: 'helensCarousel'
//     },
//     pool: {min: 0, max: 7}
// })
// knex.schema.hasTable('listings')
// .then((exists) => {
//     if(!exists){
//         knex.schema.createTable('listings', (table) => {
//             table.increments('id').primary();
//             table.integer('count');
//         })
//     }
// });
// knex.schema.hasTable('images')
// .then((exists) => {
//     if(!exists){
//         knex.schema.createTable('images', (table) => {
//             table.increments('id').primary();
//             table.text('image_url');
//             table.text('image_caption');
//     })
//     }
// })



// var faker = require('faker');

// // These are 20 static images files to use for each of the 100 Airbnb listings
// const sampleStaticData = ['file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/1.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/2.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/3.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/4.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/5.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/6.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/7.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/8.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/9.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/10.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/11.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/11.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/12.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/13.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/14.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/15.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/16.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/17.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/18.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/19.jpeg',
// 'file:///Users/helenjsoh/Desktop/HS-images/CarouselPics/20.jpeg']

// let listingData = [];
// let imageData = [];

// let creationCounter = 0; 
// let adderNum = 150000;
// let max = 150000;
// let imageMax = 1000;
// // This fn will create 100 listing objs with an arr of 8-10 image objs
// const createMockData = () => {
//     listingData = [];
//     imageData = [];
//     // This loop will create 100 listing objs
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
//     creationCounter++;
// };
// createMockData(creationCounter, max);


// // Run this function once to load the mockData into mongoDB.
// const loadListingCollection = () => {
//     let listingArray = [];
//     let data;

//     let adder = () => {
//         listingArray = [];
//         for (var i = 0; i < listingData.length; i++) {
//             // console.log(listingData[i].id)
//             data = new db.Listing({
//                 id: listingData[i].id,
//                 count: listingData[i].count
//             })
//             listingArray.push(data);
//         }
//         data.collection.insertMany(listingArray, (err, data) => {
//             if (err) {
//                 console.log('Could not save listing data', err);
//             } else if(creationCounter < 10000000){
//                 // console.log('we can still do more. creationCounter is at', counter);
//                 // console.log('verify creationCounter: ', creationCounter);
//                 max += adderNum;
//                 console.log('entered: ', creationCounter, ' data points so far!');
//                 createMockData();
//                 adder();
//             } else {
//                 console.timeEnd('timer');
//                 console.log('stopping');
//             }
//         })
//     }
//     console.time('timer');
//     adder();
// };
// const loadImageCollection = () => {
//     let imageArray = [];
//     let data;

//     for (var i = 0; i < imageData.length; i++) {
//         // console.log(imageData[0].id)
//         data = new db.Image({
//             id: imageData[i].listing_id,
//             image_url: imageData[i].image_url,
//             image_caption: imageData[i].image_caption
//         })
//         imageArray.push(data);
//     }
//     data.collection.insertMany(imageArray, (err, data) => {
//         if (err) {
//             console.log('Could not save image data', err);
//         } else {
//             console.log('Image data has been saved.')
//         }
//     })
// };

// // loadListingCollection();
// loadImageCollection();