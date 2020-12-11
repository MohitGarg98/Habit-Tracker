const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

mongoose.connect("mongodb://localhost/habit_tracker_db", {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.use('/', require('./routes'));

app.listen('3000', function (err) {
    if(err){console.log(err); return;}
    else{console.log('serever 3000');}
})