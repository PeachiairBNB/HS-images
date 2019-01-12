const pg = require('pg');
const faker = require('faker');
const format = require('pg-format');
const Promise = require('promise')
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
let adderNum = 1;
let max = 1;
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
            imageSet.push(JSON.stringify(image));
        }
        // imagesArray.push(imageObj);
        imagesArray.push(imageSet);
    }
    return imagesArray;
}
let imagePool = imagesCreator(imgCount);

let creator = () => {
    let listingArray = [];
    let data;

    let adder = () => {
        listingArray = [];
        console.log('the counter and max are: ', creationCounter, max)
        let batchCreator = () => {
            return new Promise((resolve) => {
                for (var i = creationCounter; i < max; i++) {
                    let randNum = Math.floor(Math.random() * 1000);
                    data = {
                        images: imagePool[randNum]
                    }
                    listingArray.push(data.images);
                    creationCounter++;
                }
                resolve();
            });
        }
        let batchStorage = () => {
            return new Promise((resolve) => {
                for(let i = 0; i < listingArray.length; i++){
                    let array = listingArray[i];
                    console.log(array);
                    storageQuery = format('INSERT INTO imagespool (images) VALUES %L', '{' + array + '}');
                    console.log(storageQuery);
                    // console.log(storageQuery.constructor === String);
                    //true
                    // pgsql.query(storageQuery);

                    // const query = {
                    //     text: 'INSERT INTO imagespool (images) VALUES($1)',
                    //     values: listingArray[i],
                    // }
                    // pgsql.query(query)
                    // .catch((err) => {
                    //     console.log("THERE WAS AN ERROR: ", err)
                    // })
                }
                resolve();
            })
        }
        let checker = () => {
            if(creationCounter < 2){
                max += adderNum;
                console.log('entered: ', creationCounter, ' data points so far!');
                adder();
            } else {
                console.timeEnd('timer');
                console.log('stopping');
            }
        }

        batchCreator(listingArray)
        .then(() => {
            batchStorage();
        })
        .then(() => {
            checker();
        })
    }
    console.time('timer');
    adder();
}
creator();




//let query = {
    //     text: `INSERT INTO imagespool (images) VALUES ($1)`,
    //     values: [data.images]
    // }
    // storageArray.push(query);



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