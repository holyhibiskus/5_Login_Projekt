var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

let cars = require("../controllers/index").cars;

router.get('/', function (req, res, next) {
    console.log("get");
    cars.findAll({attributes: ['idCar', 'name', 'type', 'powerKw', 'fin', 'image']}).then(function (cars) {
        res.json({"cars": cars});
    })
});

router.delete('/:idCar', function (req, res, next) {
    // uif Rolle = admin
    var idCar = req.params.idCar || '';
    console.log("delete")
    console.log(req.params);
    cars.destroy({where: {idCar: idCar}});
    res.json({info: idCar.concat(" deleted")});
});


router.post('/', function (req, res, next) {
    console.log("post")

    console.log(req.body)
    var name = req.body.name || '';
    var type = req.body.type || '';
    var fin = req.body.fin || '';
    var powerKw  = req.body.powerKw || '';

    var newCar = cars.build({
        name: name,
        type: type,
        fin: fin,
        powerKw: powerKw
    });

    newCar.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Neu angelegt"});
});

module.exports = router;
