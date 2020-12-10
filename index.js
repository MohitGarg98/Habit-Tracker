const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Status = require('./models/habit');
const expressLayouts = require('express-ejs-layouts');


mongoose.connect("mongodb://localhost/habit_tracker_db", {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayouts);

app.get('/', function (req, res) {
    var remove = req.query.remove;
    var add = req.query.add;
    Status.find({}, function (err, status) {
        if(err)
        {
            console.log(err);
            return;
        }else{
            res.render('home', {status: status, remove: remove, add: add});
        }
    })
})

app.get('/all-habits', function (req, res) {
    var remove = req.query.remove;
    var add = req.query.add;
    Status.find({}, function (err, status) {
        if(err)
        {
            console.log(err);
            return;
        }else{
            res.render('all_habits', {status: status, remove: remove, add: add});
        }
    })
})

app.get('/delete-status', function (req, res) {
    var remove = req.query.remove;
    console.log('455', req.query.remove);
    Status.findByIdAndDelete(req.query.id, function (err) {
        if(err)
        {
            console.log(err);
            return;
        }else{
            var backPath = req.header('Referer').split("?")[0].slice(21);
            console.log('54', backPath);
            res.redirect(`${backPath}?remove=${remove}`);
        }
    })
})

app.get('/change-button-content', function (req, res) {
    var status = JSON.parse(req.query.status);
    var index = req.query.index;
    var buttonContent = status.button[index];
    var buttonArr = status.button;

    if(buttonContent === "Not Done")
    {
        buttonArr[index] = 'Pending';
    }else if(buttonContent === "Pending"){
        buttonArr[index] = "Done";
    }else{
        buttonArr[index] = "Not Done";
    }

    console.log('55', status._id);
    Status.findByIdAndUpdate(status._id, {button: buttonArr}, function (err, onStatus) {
        if(err){console.log('54', err); return;}
        else{
            console.log(onStatus);
        }
    })

    res.redirect('/');
})

app.post('/create-status', function (req, res) {
    var add = req.query.add;
    console.log('85', add);
    Status.create({
        status: req.body.status
    }, function (err, newStatus) {
        if(err){
            console.log('23',err,'23');
            return;
        }
    })
    var backPath = req.header('Referer').split("?")[0].slice(21);
    console.log('54', backPath);
    res.redirect(`${backPath}?add=${add}`);
    // res.redirect(`/?add=${add}`);
})

app.listen('3000', function (err) {
    if(err){console.log(err); return;}
    else{console.log('serever 8000');}
})