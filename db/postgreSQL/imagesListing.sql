DROP DATABASE SDC;

CREATE DATABASE SDC;

\c sdc;

DROP TABLE imagesPool;

CREATE TABLE imagesPool(
    id SERIAL PRIMARY KEY,
    images TEXT []
);