var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://taskuser:taskuser@ds159013.mlab.com:59013/mytasklist_richard', ['tasks']);

// Get Tasks
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.sedn(err);
        } else {
            res.json(tasks);
        }
    })
});

// Get Single Task
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id : mongojs.ObjectId(req.params.id) }, function(err, tasks) {
        if (err) {
            res.sedn(err);
        } else {
            res.json(tasks);
        }
    })
});

// Task 저장
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.send('Bad Data');
    } else {
        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                res.json(task);
            }
        })
    }

});

// Get Single Task
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id : mongojs.ObjectId(req.params.id) }, function(err, tasks) {
        if (err) {
            res.sedn(err);
        } 
        
        res.json(tasks);
        
    })
});

// 테스크 수정
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        this.updTask.isDone = task.isDone;
    }

    if (task.title) {
        this.updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    } else {
        db.tasks.update({ _id : mongojs.ObjectId(req.params.id) }, updTask, {}, function(err, tasks) {
            if (err) {
                res.sedn(err);
            } 
            
            res.json(tasks);
            
        })
    
    }

});


module.exports = router;