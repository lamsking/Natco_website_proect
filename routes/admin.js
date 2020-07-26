var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');
var aboutController = require('../controllers/aboutController');
var worksController = require('../controllers/worksController');
var newsController = require('../controllers/newsController');


router.get('/admin', adminController.index);

// About Manager Routes

router.get('/admin/about', aboutController.index);
router.get('/admin/about/create', aboutController.create);
router.post('/admin/about/store', aboutController.store);
router.get('/admin/about/edit/:id', aboutController.show);
router.post('/admin/about/update/:id', aboutController.update);
router.get('/admin/about/delete/:id', aboutController.delete);

// News Manager Routes

router.get('/admin/news', newsController.index);
router.get('/admin/news/create', newsController.create);
router.post('/admin/news/store', newsController.store);
router.get('/admin/news/edit/:id', newsController.show);
router.post('/admin/news/update/:id', newsController.update);
router.get('/admin/news/delete/:id', newsController.delete);

// Works Manager Routes

router.get('/admin/works', worksController.index);
router.get('/admin/works/create', worksController.create);
router.post('/admin/works/store', worksController.store);
router.get('/admin/works/edit/:id', worksController.show);
router.post('/admin/works/update/:id', worksController.update);
router.get('/admin/works/delete/:id', worksController.delete);


module.exports = router;
