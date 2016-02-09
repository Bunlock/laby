var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
//on fait référence au modèle
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

var check = function(req,res,next){
	if (!req.query.username){
		res.status(401);
		res.send('Unauthorized');
		return;
	}  
	next();
};

router.get('/all', function(req,res,next){
	User.find(function(err,users){
		if (err) throw err;
		res.json(users);
	});
	
});

router.post('/signup', function(req,res,next){
	console.log('signup demandé');
	//req.query pour les get, req.body pour les post
	if (!req.body.username || !req.body.password){
		res.status(401);
		res.send('Unauthorized');
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
			res.json({username: req.body.username});
		});
	});
});

module.exports = router;
