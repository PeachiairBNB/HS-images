const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/helensMongoCarousel';
const client = new MongoClient(uri);
const connection = client.connect();
const faker = require('faker');

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
let creationCounter = 0; 
let adderNum = 150000;
let max = 150000;
let imageMax = 1000;

const connect = connection;
connect.then(() => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        let randomNum = Math.floor(Math.random() * 3) + 8;
        console.log('the counter and max are: ', creationCounter, max)
        for (var i = creationCounter; i < max; i++) {
            data = {
                id: i,
                count: randomNum
            }
            listingArray.push(data);
            creationCounter++;
        }
        let db = client.db('helensMongoCarousel');
        let listingsDB = db.collection('listings');
        listingsDB.insertMany(listingArray, (err, data) => {
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
})
.then(() => {
    let imageArray = [];
    let data;

    for (var i = 0; i < imageMax; i++) {
        let url = sampleStaticData[Math.floor(Math.random() * Math.floor(20))];
        let caption = faker.lorem.sentence();
        data = {
            id: i,
            image_url: url,
            image_caption: caption
        }
        imageArray.push(data);
    }
    let db = client.db('helensMongoCarousel');
    let imagesDB = db.collection('images');
    console.time('imageSave')
    imagesDB.insertMany(imageArray, (err, data) => {
        if (err) {
            console.log('Could not save image data', err);
        } else {
            console.timeEnd('imageSave');
            console.log('Image data has been saved.')
        }
    })
})
.then(() => {
    console.log('Here we go!')
    // console.log('Done. Added ', creationCounter, ' listings into the listings database & ', imageMax, ' images into the images database!')
})