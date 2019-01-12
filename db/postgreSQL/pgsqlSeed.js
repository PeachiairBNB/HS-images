const pg = require('pg');
var faker = require('faker');
const connection = process.env.DATABASE_URL || 'postgres://localhost:5432/sdc';
const pgsql = new pg.Client(connection);
pgsql.connect();

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

let creationCounter = 0; 
let adderNum = 150000;
let max = 150000;
let imgCount = Math.floor(Math.random() * 3) + 8;

let imagesCreator = (maxNum) => {
    let imagesArray = [];
    for(let i = 0; i < 1000; i++){
        // let imageObj = {};
        let imageSet = [];
        for(let j = 0; j < maxNum; j++){
            let url = sampleStaticData[Math.floor(Math.random() * Math.floor(20))];
            let caption = faker.lorem.sentence();
            image = {
                image_url: url,
                image_caption: caption
            }
            // imageObj[j] = image;
            imageSet.push(image);
        }
        // imagesArray.push(imageObj);
        imagesArray.push(imageSet);
    }
    return imagesArray;
}
let imagePool = imagesCreator(imgCount);

let creator = async () => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        // console.log('the counter and max are: ', creationCounter, max)
        let batchCreator = async (storageArray) => {
            for (var i = creationCounter; i < max; i++) {
                let randNum = Math.floor(Math.random() * 1000);
                data = {
                    images: imagePool[randNum]
                }
                let query = {
                    text: `INSERT INTO imagespool (images) VALUES ($1)`,
                    values: [data.images]
                }
                storageArray.push(query);
                creationCounter++;
            }
            console.log('BATCH CREATED!', storageArray.length)
        }
        let batchStorage = async (storageArray) => {
            console.log('STORING BATCH SIZE: ', storageArray.length);
            for(let j = 0; j < storageArray.length; j++){
                pgsql.query(storageArray[j])
                .catch((err) => {
                    console.log("THERE WAS AN ERROR!!", err)
                })
            }
        }
        let checker = async () => {
            if(creationCounter < 300000){
                max += adderNum;
                console.log('entered: ', creationCounter, ' data points so far!');
                adder();
            } else {
                console.timeEnd('timer');
                console.log('stopping');
            }
        }
        batchCreator(listingArray)
        batchStorage(listingArray);
        checker();
    }
    console.time('timer');
    adder();
}
creator();







// .then(() => {
                //     if(creationCounter < 1000000){
                //         max += adderNum;
                //         console.log('entered: ', creationCounter, ' data points so far!');
                //         adder();
                //     } else {
                //         console.timeEnd('timer');
                //         console.log('stopping');
                //     }
                // })