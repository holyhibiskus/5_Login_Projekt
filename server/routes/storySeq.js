var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

let stories = require("../controllers/index").stories;

router.get('/', function (req, res, next) {
    console.log("get");
    stories.findAll({attributes: ['idCar', 'title', 'theme', 'creator']}).then(function (stories) {
        res.json({"stories": stories});
    })
});

router.delete('/:idstory', function (req, res, next) {
    // uif Rolle = admin
    let idstory = req.params.idstory || '';
    console.log("delete")
    console.log(req.params);
    stories.destroy({where: {idstory: idstory}});
    res.json({info: idstory.concat(" deleted")});
});


router.post('/', function (req, res, next) {
    console.log("post")

    console.log(req.body)
    let title = req.body.title || '';
    let theme = req.body.theme || '';
    let creator = req.body.creator || '';

    let newStory = stories.build({
        title: title,
        theme: theme,
        creator: creator,
    });

    newStory.save().catch(function (error) {
        console.log('Error while inserting: ' + error.stack);
    });
    res.json({"info": "Neu angelegt"});
});

module.exports = router;
