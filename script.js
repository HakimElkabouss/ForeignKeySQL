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
        db.run('CREATE TABLE vehicles (vehicles_id INTEGER PRIMARY KEY AUTOINCREMENT, vehicles TEXT UNIQUE)');
        db.run('INSERT INTO vehicles (vehicles) VALUES (?)','Mercedes');
        db.run('INSERT INTO vehicles (vehicles) VALUES (?)','Audi');
        db.run('INSERT INTO vehicles (vehicles) VALUES (?)','Ford');
        db.run('INSERT INTO vehicles (vehicles) VALUES (?)','BMW');

        db.run('CREATE TABLE sexe (sexe_id INTEGER PRIMARY KEY AUTOINCREMENT, sexe TEXT UNIQUE)');
        db.run('INSERT INTO sexe (sexe) VALUES (?)','Male');
        db.run('INSERT INTO sexe (sexe) VALUES (?)','Female');
        

        db.run('CREATE TABLE personnes (personnes_id INTEGER PRIMARY KEY AUTOINCREMENT, personnes TEXT UNIQUE)');
        db.run('INSERT INTO personnes (personnes) VALUES (?)','Yvane');
        db.run('INSERT INTO personnes (personnes) VALUES (?)','Theophile');
        db.run('INSERT INTO personnes (personnes) VALUES (?)','Wiliam');
        db.run('INSERT INTO personnes (personnes) VALUES (?)','Sara');

        db.run('CREATE TABLE results (results_id INTEGER PRIMARY KEY AUTOINCREMENT, personnes_id INTEGER,  sexe_id INTEGER, vehicles_id INTEGER, FOREIGN KEY(personnes_id) REFERENCES personnes(id), FOREIGN KEY(sexe_id) REFERENCES sexe(id), FOREIGN KEY(vehicles_id) REFERENCES vehicles(id))');
        db.run('INSERT INTO results (personnes_id, vehicles_id, sexe_id) VALUES (?, ?, ?)',1,1,1);
        db.run('INSERT INTO results (personnes_id, vehicles_id, sexe_id) VALUES (?, ?, ?)',2,2,1);
        db.run('INSERT INTO results (personnes_id, vehicles_id, sexe_id) VALUES (?, ?, ?)',3,4,1);
        db.run('INSERT INTO results (personnes_id, vehicles_id, sexe_id) VALUES (?, ?, ?)',4,3,2);

        // db.run('CREATE TABLE groupes (groupes_id INTEGER PRIMARY KEY AUTOINCREMENT, vehicles_id INTEGER, personnes_id INTEGER, FOREIGN KEY(vehicles_id) REFERENCES vehicles(id), FOREIGN KEY(personnes_id) REFERENCES personnes(id))');
        // db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',1,1);
        // db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',2,2);
        // db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',4,3);
        // db.run('INSERT INTO groupes (vehicles_id, personnes_id) VALUES (?, ?)',3,4);


        
db.all('SELECT * FROM personnes NATURAL JOIN vehicles NATURAL JOIN sexe NATURAL JOIN results', function(error, data){
    if (!error) console.log(data);
        else console.log(error);
});
}}); 



 app.get('/',function (request, response){
    db.all('SELECT * FROM personnes NATURAL JOIN vehicles NATURAL JOIN sexe NATURAL JOIN results', function (error, data){
         response.send(data);
     });
});
app.listen(4000, function (error){
   if(!error) console.log('app listening port 4000');
});

