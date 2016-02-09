var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
//on fait référence au modèle
var User = mongoose.model('User');

//todo: trouver solution node path wdaube :
var Maze = require('../lib/laby_algo');
var util = require('util');
console.log('abc',util.inspect(Maze));

function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

/* GET home page. */
router.get('/', function(req, res, next){
  if(req.user) res.render('home.ejs', {user:req.user});
  else res.redirect('/login');
});

router.all('/login', function(req,res,next){
  if (!req.body.username || !req.body.password){
    res.render('login.ejs', {error:''});
    return;
  }
  //next();
  User.findOne({username: req.body.username},function(err, user){
    if (err) throw err;
    if (!user) {
      res.render('login.ejs',{error:'username not found'});
      return;
    }

    var new_password = hashPW(req.body.password);
    if (user.hashed_password == new_password) {
      req.session.userId = user._id;
      res.redirect('/');
    }
  });
});

router.all('/signup', function(req,res,next){
  console.log('signup demandé');
  //req.query pour les get, req.body pour les post
  if (!req.body.username || !req.body.password){
    res.render('signup.ejs');
    return;
  }
  // on vérif si l'user n'existe pas:
  User.findOne({username: req.body.username},function(err, doc){
    if (err){
      throw err;
    }
    if (doc){
      res.status(403);
      res.send('User already exists');
      return;
    }
    //sinon, on crée le mdp
    var myhash = hashPW(req.body.password.toString());
    //on enregistre le nouvel utilisateur
    var user = new User({username: req.body.username, hashed_password:myhash});
    user.save(function(err){
      if (err){
        throw err;
      }
      //res.json({username: req.body.username});
      res.redirect('/');
    });
  });
});

/*
* Si on a un tableau, on l'affiche
* Si on en a pas, on le génère puis on l'affiche:
*   si on a x et y, on les utilise
*   sinon, valeurs par défaut
* */

router.get('/laby_bo', function(req,res,next){
  if (!req.user){
    res.status(401);
    res.send('Not connected');
    return;
  }
  var a;
  if (Array.isArray(req.user.maze)){
    a = req.user.maze;
  } else {
    a = Maze.new_2d_array(req.query.X||10, req.query.Y||10);
    Maze.init_2d_array(a, 15);
    Maze.dig(a, 0, 0);
    Maze.dig_ES(a);
  }
  res.render('laby_bo.ejs',{maze:a});




});
router.get('/laby', function(req,res,next){
  res.render('laby.ejs');
});
router.get('/scores', function(req,res,next){
  res.render('scores.ejs');
});

module.exports = router;
