var express = require('express');
var router = express.Router();
var webController = require('../controllers/webController');

// Website Routes

router.get('/', webController.index);
router.get('/about', webController.about);
router.get('/works', webController.works);
router.get('/news', webController.news);
router.get('news/:id', webController.showNew);
router.get('/contact', webController.contact);

// Authentification Routes

router.get('/login', webController.login);
router.post('/authentification', webController.authentification);
router.get('/register', webController.register);
router.post('/signup', webController.signup);
router.get('/logout', webController.logout);


module.exports = router;
