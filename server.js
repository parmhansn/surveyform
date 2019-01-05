var express = require("express");
var app = express();

var path = require("path");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

var session = require('express-session');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'survey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
}))

app.get('/', function(req,res){
    res.render("index", req)
})


app.post('/register', function(req, res) {
    if (!req.session.survey){
        req.session.survey = 1;
    }
    else (req.session.survey += 1);
    req.session.formdata = req.body
    console.log(req.session.formdata)
res.redirect("result");
})



app.get('/result', function(req, res) {
 res.render("result", {survey: req.session.survey, formdata: req.session.formdata});
})




app.listen(8000, function() {
 console.log("listening on port 8000");
});
