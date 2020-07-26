const New = require('../models/news')
let allNews = []
let notification = undefined
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

exports.index = (req, res) => {
  New.find()
  .then(data => {
      allNews = data
      res.status(200).render('admin/news/index', {
        data: data,
        notification: notification
      })
  }).catch(err => {
      notification = err.message +"Impossible to load Data"
      res.status(500).render('admin/news/index', {
        data: allNews,
        notification: notification
      })
  })
}

exports.create = (req, res) => {
  res.status(200).render('admin/news/create', {
    notification: notification
  })
}


exports.store = (req, res) => {
  var pathFile = undefined

  if(req.files.path){
    console.log(req.files.path);
    var fichier = req.files.path
    fichier.mv('public/upload/'+fichier.name, error => {
      if(error) console.log(error)
      console.log('Files uploaded')
      pathFile = '/upload/'+fichier.name
    })

    const data = new New({
      _id: mongoose.Types.ObjectId(),
      titre: req.body.title,
      content: req.body.content,
      file: pathFile
    })

    data.save()
      .then( fichier => {
        console.log('Data saved ')
        res.status(200).redirect('/admin/news')
      })
      .catch( error => {
        console.log('Error to save on database')
        res.status(500).redirect('/admin/news/create');
      })
    }
}


exports.show = (req, res) => {
  New.findById(req.params.id)
    .then(data => {
       console.log(New);
       res.status(200).render('admin/news/edit', {
         data: data,
         notification: notification
       })
    })
    .catch(err => {
      res.status(500).redirect('/admin/news');
    })
}


exports.update = (req, res) => {
  New.updateOne({"_id": ObjectID(req.body.id)}, {$set:{"titre": req.body.title, "content": req.body.content}}, function(err, result){
    res.status(201).redirect('/admin/news');
  });
}


exports.delete = (req, res) => {
  New.findByIdAndRemove(req.params.id, function (err) {
         if (err) return next(err);
         res.status(201).redirect('/admin/news');
  })
}
