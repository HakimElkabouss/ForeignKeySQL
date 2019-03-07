const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const app = express();
app.use(cors());

const dbfile = "message.db";
const db = new sqlite3.Database(dbfile);


db.serialize( () => {
    if (!fs.existsSync(dbfile)){
        db.run('CREATE TABLE personnes (personne_id INTEGER PRIMARY KEY AUTOINCREMENT, personne TEXT UNIQUE)');
        db.run('INSERT INTO personnes (personne) VALUES (?)','Yvane');
        db.run('INSERT INTO personnes (personne) VALUES (?)','Theophile');
        db.run('INSERT INTO personnes (personne) VALUES (?)','Wiliam');
        db.run('INSERT INTO personnes (personne) VALUES (?)','Sara');

        db.run('CREATE TABLE vehicles (vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle TEXT UNIQUE)');
        db.run('INSERT INTO vehicles (vehicle) VALUES (?)','Mercedes');
        db.run('INSERT INTO vehicles (vehicle) VALUES (?)','Audi');
        db.run('INSERT INTO vehicles (vehicle) VALUES (?)','Ford');
        db.run('INSERT INTO vehicles (vehicle) VALUES (?)','BMW');

        db.run('CREATE TABLE pictures (picture_id INTEGER PRIMARY KEY AUTOINCREMENT, picture_link TEXT UNIQUE)');
        db.run('INSERT INTO pictures (picture_link) VALUES (?)','images/mercedes.png');
        db.run('INSERT INTO pictures (picture_link) VALUES (?)','images/audi.png');
        db.run('INSERT INTO pictures (picture_link) VALUES (?)','images/ford.png');
        db.run('INSERT INTO pictures (picture_link) VALUES (?)','images/bmw.png');

        db.run('CREATE TABLE gender (gender_id INTEGER PRIMARY KEY AUTOINCREMENT, gender TEXT UNIQUE)');
        db.run('INSERT INTO gender (gender) VALUES (?)','Male');
        db.run('INSERT INTO gender (gender) VALUES (?)','Female');
        

        

        db.run('CREATE TABLE results (results_id INTEGER PRIMARY KEY AUTOINCREMENT, personne_id INTEGER,  gender_id INTEGER, vehicle_id INTEGER, picture_id INTEGER, FOREIGN KEY(personne_id) REFERENCES personnes(id), FOREIGN KEY(gender_id) REFERENCES gender(id), FOREIGN KEY(vehicle_id) REFERENCES vehicles(id), FOREIGN KEY(picture_id) REFERENCES pictures(id))');
        db.run('INSERT INTO results (personne_id, vehicle_id, picture_id ,gender_id) VALUES (?, ?, ?, ?)',1,1,1,1);
        db.run('INSERT INTO results (personne_id, vehicle_id, picture_id ,gender_id) VALUES (?, ?, ?, ?)',2,2,2,1);
        db.run('INSERT INTO results (personne_id, vehicle_id, picture_id ,gender_id) VALUES (?, ?, ?, ?)',3,4,4,1);
        db.run('INSERT INTO results (personne_id, vehicle_id, picture_id ,gender_id) VALUES (?, ?, ?, ?)',4,2,2,2);



        
db.all('SELECT * FROM personnes NATURAL JOIN vehicles NATURAL JOIN gender NATURAL JOIN pictures NATURAL JOIN results', function(error, data){
    if (!error) console.log(data);
        else console.log(error);
});
}}); 



 app.get('/',function (request, response){
    db.all('SELECT * FROM personnes NATURAL JOIN vehicles NATURAL JOIN gender NATURAL JOIN pictures NATURAL JOIN results', function (error, data){
         response.send(data);
     });
});
app.listen(4000, function (error){
   if(!error) console.log('app listening port 4000');
});

