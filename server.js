var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// homepage route
app.get('/', function (req, res) {
    return res.send({ error: false, message: "Welcome to 'Build RESTful CRUD API in Node.js with Express.js and MySQL' Tutorial", writen_by: "Md Obydullah", published_on: "https://shouts.dev" })
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

const getdb =  require('./config/database')
var initModels = require("./models_BOOK/init-models");

var db,models;

async function init(){
    if (db==null) {db = await getdb()}
    if (models==null){ 
        try{
            models = initModels(db)
            models.books.findOne({})
        } catch(e) {
            console.log(e);
            throw e;      // let caller know the promise was rejected with this reason
        }
    }
}

init();
// add a new book  
app.post('/book', function (req, res) {
    init()
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!name || !author)
        return res.status(400).send({ error: true, message: 'Please provide book name and author' });
    let some;
    // insert to db
    models.books.create(
        {
            name,
            author
        }
    )
        .then(books => res.send(books))
        .catch(err => { console.log(err) })
});

// retrieve all books 
app.get('/books', function (req, res) {
    init()
    //models.books.init()
    models.books.findAll()
        .then(books => res.send(books))
        .catch(err => { console.log(err) })
});

// retrieve book by id 
app.get('/book', function (req, res) {
    init()
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }

    models.books.findByPk(id)
        .then(books => res.send(books))
        .catch(err => { console.log(err) })

});

// update book with id
app.put('/book', function (req, res) {
    init()
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!id || !name || !author) {
        return res.status(400).send({ error: book, message: 'Please provide book id, name and author' });
    }

    models.books.update(
        {
            name,
            author
        },
        { where: { id } }
    )
        .then(books => res.send(books))
        .catch(err => { console.log(err) })
});

// delete book by id
app.delete('/book', function (req, res) {
    init()
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide book id' });
    }
    models.books.destroy({ where: { id } })
        .then(books => res.send(books.toString()))
        .catch(err => { console.log(err) })

});

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

app.get('/book/search',(req,res) => {
    init()
    let name = req.body.name;
    let author = req.body.author;
    
    models.books.findAll({where : {
        [Op.or]: {
            name : {[Op.like]: '%' + name + '%'} ,
            author : {[Op.like]: '%' + author + '%'} 
        }
    }
    })
    //.then(gigs=> {console.log(gigs)})
    .then(books => res.send(books))
    .catch(err => { console.log(err) })
} )


module.exports = app;