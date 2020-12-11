const Habit = require('../models/habit');

module.exports.home = function (req, res) {
    var remove = req.query.remove;
    var add = req.query.add;
    Habit.find({}, function (err, habits) {
        if(err) {console.log(err); return;}
        else{
            res.render('home', {habits: habits, remove: remove, add: add});
        }
    })
}

module.exports.allhabits = function (req, res) {
    var remove = req.query.remove;
    var add = req.query.add;
    Habit.find({}, function (err, habits) {
        if(err) {console.log(err); return;}
        else{
            res.render('all_habits', {habits: habits, remove: remove, add: add});
        }
    })
}

module.exports.deleteHabit = function (req, res) {
    var remove = req.query.remove;
    Habit.findByIdAndDelete(req.query.id, function (err) {
        if(err) {console.log(err); return;}
        else{
            var backPath = req.header('Referer').split("?")[0].slice(21);
            res.redirect(`${backPath}?remove=${remove}`);
        }
    })
}

module.exports.changeStatus = function (req, res) {
    var status = JSON.parse(req.query.status);
    var index = req.query.index;
    var statusContent = status.status[index];
    var statusArr = status.status;

    if(statusContent === "Not Done")
    {
        statusArr[index] = 'Pending';
    }else if(statusContent === "Pending"){
        statusArr[index] = "Done";
    }else{
        statusArr[index] = "Not Done";
    }

    Habit.findByIdAndUpdate(status._id, {status: statusArr}, function (err, status) {
        if(err){console.log(err); return;}
    })
    
    res.redirect('/');
}

module.exports.createHabit = function (req, res) {
    var add = req.query.add;
    Habit.create({
        habit: req.body.habit
    }, function (err, newHabit) {
        if(err){
            console.log(err);
            return;
        }
    })
    var backPath = req.header('Referer').split("?")[0].slice(21);
    res.redirect(`${backPath}?add=${add}`);
}