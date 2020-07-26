const Work = require('../models/works')
let allworks = []
let notification = undefined
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

exports.index = (req, res) => {
  Work.find()
  .then(works => {
      allworks = works
      res.status(200).render('admin/works/index', {
        data: works,
        notification: notification
      })
  }).catch(err => {
      notification = err.message +"Impossible to load Data"
      res.status(500).render('admin/works/index', {
        data: allworks,
        notification: notification
      })
  })
}

exports.create = (req, res) => {
  res.status(200).render('admin/works/create', {
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

    const work = new Work({
      _id: mongoose.Types.ObjectId(),
      description: req.body.description,
      client: req.body.client,
      file: pathFile
    })

    work.save()
      .then( fichier => {
        console.log('Data saved ')
        res.status(200).redirect('/admin/works')
      })
      .catch( error => {
        console.log('Error to save on database')
        res.status(500).redirect('/admin/works/create');
      })
    }
}


exports.show = (req, res) => {
  Work.findById(req.params.id)
    .then(data => {
       console.log(data);
       res.status(200).render('admin/works/edit', {
         data: data,
         notification: notification
       })
    })
    .catch(err => {
      res.status(500).redirect('/admin/works');
    })
}


exports.update = (req, res) => {
  Work.updateOne({"_id": ObjectID(req.body.id)}, {$set:{"description": req.body.description, "client": req.body.client}}, function(err, result){
    res.status(201).redirect('/admin/works');
  });
}


exports.delete = (req, res) => {
  Work.findByIdAndRemove(req.params.id, function (err) {
         if (err) return next(err);
         res.status(201).redirect('/admin/works');
  })
}
