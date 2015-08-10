var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});
router.get('/challenge2', function(req, res){
  res.render('challenge2', {
    title: 'Challenge 2'
  });
});

/*

Database connection and operations
 mongodb://c1:pass@ds033143.mongolab.com:33143/mydb
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://c1:pass@ds033143.mongolab.com:33143/mydb');
var Schema = new mongoose.Schema({
    _id    : String,
    name: String,
    age   : Number
});
var user = mongoose.model('customers', Schema);

router.post('/addnewCustomer', function(req, res){

    new user({
        _id    : req.body.email,
        name: req.body.name,
        age   : req.body.age
    }).save(function(err, doc){
            if(err) res.json(err);
            else
                //res.send('Successfully inserted!');
                //router.get('/listcustomers', function(req, res){
                //res.render('listcustomers', {
                //    title: 'Challenge 2'
                //});
                //});
                user.find({}, function(err, docs){
                    if(err) res.json(err);
                    else    res.render('listcustomers', {users: docs});
                });

        });
});

//LIST

router.get('/listcustomers', function(req, res){
    user.find({}, function(err, docs){
        if(err) res.json(err);
        else    res.render('listcustomers', {users: docs});
    });
});


//EDIT / UPDATE

router.get('/user/:id/edit', function(req, res){
    res.render('editcustomer', {user: req.userId});
});



router.param('id', function(req, res, next, id){
    user.findById(id, function(err, docs){
        if(err) res.json(err);
        else
        {
            req.userId = docs;
            next();
        }
    });
});

//router.get('/user/:id', function(req, res){
//    //router.put('/user/:id', function(req, res){
//        userr.update({_id: req.params.id},
//            {
//                name: req.body.name,
//                age   : req.body.age
//            }, function(err, docs){
//                if(err) res.json(err);
//                else
//                    user.find({}, function(err, docs){
//                        if(err) res.json(err);
//                        else    res.render('listcustomers', {users: docs});
//                    });
//            });
//    //});
//    res.render('listcustomers', {user: req.userId});
//});

router.get('/view', function(req, res){
    user.find({}, function(err, docs){
        if(err) res.json(err);
        else    res.render('index', {users: docs})
    });
});

router.post('/new', function(req, res){
    new user({
        _id    : req.body.email,
        name: req.body.name,
        age   : req.body.age
    }).save(function(err, doc){
            if(err) res.json(err);
            else    res.redirect('/view');
        });
});

router.post('/user/:id', function(req, res){
    user.findByIdAndUpdate({_id: req.params.id},
        {
            name: req.body.name,
            age   : req.body.age
        }, function(err, docs){
            if(err) res.json(err);
            else
            {
                 res.redirect('/listcustomers');
                //console.log(docs);
                //res.redirect('/user/'+req.params.id);
                //router.get('/listcustomers', function(req, res){
                //    user.find({}, function(err, docs){
                //        if(err) res.json(err);
                //        else    res.render('listcustomers', {users: docs});
                //    });
                //});
            }
        });
});

//DELETE



router.get('/user/:id/delete', function(req, res){
    user.remove({_id: req.params.id},
        function(err){
            if(err) res.json(err);
            else
                res.redirect('/listcustomers');
                //router.get('/listcustomers', function(req, res){
                //    user.find({}, function(err, docs){
                //        if(err) res.json(err);
                //        else    res.render('listcustomers', {users: docs});
                //    });
                //});
        });
});

//router.get('/user/:id/delete', function(req, res){
//    user.findByIdAndRemove({_id: req.params.id},
//        function(err, docs){
//            if(err) res.json(err);
//            else
//                router.get('/listcustomers', function(req, res){
//                    user.find({}, function(err, docs){
//                        if(err) res.json(err);
//                        else    res.render('listcustomers', {users: docs});
//                    });
//                });
//        });
//});

module.exports = router;
