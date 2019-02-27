// var msg = require('./message.js');
// msg.name('hakim');

const sqlite3 = require('sqlite3').verbose();
const express = require('express');

const fs = require('fs');
const app = express();

const dbfile = "message.db";
const db = new sqlite3.Database(dbfile);

db.serialize( () => {
    if (!fs.existsSync(dbfile)){
        db.run('CREATE TABLE vehicles (vehicles_id INTEGER PRIMARY KEY AUTOINCREMENT, vehicles_name TEXT UNIQUE)');
        db.run('INSERT INTO vehicles (vehicles_name) VALUES (?)','Mercedes');
        db.run('INSERT INTO vehicles (vehicles_name) VALUES (?)','Audi');
        db.run('INSERT INTO vehicles (vehicles_name) VALUES (?)','Ford');
        db.run('INSERT INTO vehicles (vehicles_name) VALUES (?)','BMW');


        db.run('CREATE TABLE personnes (personnes_id INTEGER PRIMARY KEY AUTOINCREMENT, personnes_name TEXT UNIQUE, vehicles_id INTEGER, FOREIGN KEY(vehicles_id) REFERENCES vehicles(id))');
        db.run('INSERT INTO personnes (personnes_name, vehicles_id) VALUES (?, ?)','Yvane',1);
        db.run('INSERT INTO personnes (personnes_name, vehicles_id) VALUES (?, ?)','Theophile',2);
        db.run('INSERT INTO personnes (personnes_name, vehicles_id) VALUES (?, ?)','Wiliam',4);
        db.run('INSERT INTO personnes (personnes_name, vehicles_id) VALUES (?, ?)','Ali',3);

        db.run('CREATE TABLE groupes (groupes_id INTEGER PRIMARY KEY AUTOINCREMENT, vehicles_id INTEGER, personnes_id INTEGER, FOREIGN KEY(vehicles_id) REFERENCES vehicles(id), FOREIGN KEY(personnes_id) REFERENCES personnes(id))');
        db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',1,1);
        db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',2,2);
        db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',4,3);
        db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',3,4);


        
db.all('SELECT * FROM groupes NATURAL JOIN vehicles NATURAL JOIN personnes', function(error, data){
    if (!error) console.log(data);
        else console.log(error);
});
}}); 



 app.get('/',function (request, response){
    db.all('SELECT * FROM vehicles NATURAL JOIN personnes NATURAL JOIN groupes', function (error, data){
         response.send(data);
     });
});
app.listen(4000, function (error){
   if(!error) console.log('app listening port 4000');
});

