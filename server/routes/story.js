var express = require('express');
var router = express.Router();

console.log(__dirname);

//database
let mysql = require('mysql');
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'SQLP@sswort01',
    database : 'webapp',
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

router.get('/all', function(req, res, next) {
    // res.send( { cars: [{name: "BMW", type: "320", id: "0303"} ] });
    let query = "SELECT * FROM stories";
    connection.query(query, function (err, rows) {
        if (err) {
            res.send( err.message );
        }
        // console.log(rows);
        res.send( { stories: rows });
    });
});

router.get('/id/:id', function (req, res, next) {
    connection.query("SELECT * FROM stories WHERE idstory=" + req.params.id, function (err, rows){
        res.send({stories: rows});
    });
});

router.get('/text', function (req,res){
    let sid = req.query.storyid;
    let tid = req.query.textid;
    //res.send(sid);
    connection.query("SELECT * FROM storytext WHERE idstory=" + sid + " AND idstorytext=" + tid, function (err, rows){
        res.send({storyText: rows});
    });
});

router.get('/theme/:theme', function(req,res,next){
    let amount = req.query.amount || 0;
    let offset = req.query.offset || 0;
    let theme = req.params.theme || 0;
    if(amount > 100){
        amount = 100;
    }
    connection.query("SELECT * FROM stories WHERE theme='" + theme + "' LIMIT " + amount + " OFFSET " + offset,function(err, rows){
        res.send({stories: rows});
    });
});

router.get('/author/:author', function(req,res,next){
    let amount = req.query.amount || 0;
    let offset = req.query.offset || 0;
    let author = req.params.author;
    if(amount > 100){
        amount = 100;
    }
    connection.query("SELECT * FROM stories WHERE creator='" + author + "' LIMIT " + amount + " OFFSET " + offset,function(err, rows){
        res.send({ stories: rows});
    });
});

router.get('/featured', function(req, res, next){
    let amount = req.query.amount || 0;
    let offset = req.query.offset || 0;
    if(amount > 100){
        amount = 100;
    }
    connection.query("SELECT * FROM stories ORDER BY rating DESC LIMIT " + amount + " OFFSET " + offset, function (err, rows){
        res.send({stories: rows});
    });
});

router.post('/new',function (req,res,next){
    let name = req.body.STORY_NAME || '';
    let theme = req.body.THEME || '';
    let creator = req.body.CREATOR || '';
    connection.query("INSERT INTO stories (title, theme, creator, createdon) VALUES ('"+ name + "', '"+ theme + "', '" + creator + "', NOW())", function (err, rows){
        if (err) {
            req.send(err.message);
        } else{
            res.send("Story: " + name + " added!");
        }
    });
});

router.post('/id/:id/text', function (req,res,next){
    let creator = req.body.CREATOR || '';
    let timecreated = req.body.TIME_CREATED || 'NOW()';
    let text = req.body.TEXT || '';
    connection.query("INSERT INTO storytext (idstory, text, timecreated, creator) VALUES (" + req.params.id + ", '" + text + "', " + timecreated + ", '" + creator + "')", function (err, rows){
        if (err) {
            req.send(err.message);
        } else{
            res.send("Text added to story " + req.params.id);
        }
    });
});

router.put('/update/:id', function (req,res,next){
    let name = req.body.STORY_NAME || '';
    let theme = req.body.THEME || '';
    connection.query("UPDATE stories SET title = '" + name +"', theme = '" + theme + "' WHERE idstory = " + req.params.id, function (err, rows){
        if (err) {
            req.send(err.message);
        } else{
            res.send("Updated story " + req.params.id);
        }
    });
});

router.delete('/delete/:id', function(req,res){
    connection.query("DELETE * FROM stories WHERE idstory=" + req.params.id, function(err, rows){
        if(err){
            res.send(err);
        }else{
            res.send('deleted' + req.params.id);
        }
    });
});

module.exports = router;
