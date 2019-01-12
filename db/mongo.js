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
let imgCount = Math.floor(Math.random() * 3) + 8;

let imagesCreator = (maxNum) => {
    let imagesArray = [];
    for(let i = 0; i < 1000; i++){
        let imageSet = []
        for(let j = 0; j < maxNum; j++){
            let url = sampleStaticData[Math.floor(Math.random() * Math.floor(20))];
            let caption = faker.lorem.sentence();
            image = {
                image_url: url,
                image_caption: caption
            }
            imageSet.push(image)
        }
        imagesArray.push(imageSet);
    }
    return imagesArray;
}
let imagePool = imagesCreator(imgCount);

const connect = connection;
connect.then(() => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        console.log('the counter and max are: ', creationCounter, max)
        for (var i = creationCounter; i < max; i++) {
            let randNum = Math.floor(Math.random() * 1000);
            data = {
                _id: i,
                images: imagePool[randNum]
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
    console.log('Here we go!')
    // console.log('Done. Added ', creationCounter, ' listings into the listings database & ', imageMax, ' images into the images database!')
})