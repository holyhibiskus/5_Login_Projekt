var express = require('express');
var router = express.Router();

// Mini-Datenbankserver als NPM Paket (als Javascript Implementation).
var sqlite3 = require('sqlite3');

const path = require('path');
const dbPath = path.resolve(__dirname, 'cars.db');

console.log(__dirname);

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    initDatabase();
    console.log('Connected to the cars database.');
});

function initDatabase() {
    // eine Tabelle erzeugen, falls diese noch nicht existiert.
    var query = "CREATE TABLE IF NOT EXISTS cars ( idCar INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT '', type TEXT NOT NULL DEFAULT '', fin TEXT NOT NULL DEFAULT '', powerKw INTEGER NOT NULL DEFAULT 0)";
    db.run (query);
}

router.get('/', function(req, res, next) {
    // res.send( { cars: [{name: "BMW", type: "320", id: "0303"} ] });
    var query = "SELECT * FROM cars";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
        }
        // console.log(rows);
        res.send( { cars: rows });
    });
});


router.post('/', function(req, res, next) {
    console.log(req.body);
    var name = req.body.name || '';
    var type = req.body.type || '';
    var powerKw = req.body.powerKw || '';
    var fin = req.body.fin || '';

    var query = "INSERT INTO cars (name, type, fin, powerKw) VALUES ( '" + name  + "', '" + type + "', '" + fin +  "', " + powerKw + ");";
    // "INSERT INTO cars (name, type, fin, powerKw) VALUES ('BMW', '320i', 'FIN383883', 184)
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        // get the last insert id
        console.log("row added");
        res.send({result: "ok"});
    });
});

router.put('/', function(req, res, next) {
    var name = req.body.name || '';
    var type = req.body.type || '';
    var powerKw = req.body.powerKw || 0;
    var fin = req.body.fin || '';
    var idCar = req.body.idCar || -1;
    console.log(req.body);

    var query = "UPDATE cars SET name = '" + name  + "', type = '" + type  + "', fin = '" + fin + "', powerKw = " + powerKw + " WHERE idCar = " + idCar;
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        // get the last insert id
        console.log("row modified");
        res.send({result: "ok"});
    });
});


router.delete('/delete/:idCar', function(req, res, next) {
    var idCar = req.params.idCar || -1;
    if (idCar === -1) {
        res.send("invalid id");
    }

    var query = "DELETE FROM cars WHERE idCar = " + idCar;
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        // get the last insert id
        console.log("row with idCar " + idCar + " deleted")
        res.send("ok");
    });
});

module.exports = router;