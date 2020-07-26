const Info = require('../models/infos')
let allInfos = []
let notification = undefined
var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID

exports.index = (req, res) => {
  Info.find()
  .then(infos => {
      allInfos = infos
      res.status(200).render('admin/about/index', {
        data: infos,
        notification: notification
      })
  }).catch(err => {
      notification = err.message +"Impossible to load Data"
      res.status(500).render('admin/about/index', {
        data: allInfos,
        notification: notification
      })
  })
}

exports.create = (req, res) => {
  res.status(200).render('admin/about/create', {
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

    const info = new Info({
      _id: mongoose.Types.ObjectId(),
      titre: req.body.title,
      content: req.body.content,
      file: pathFile
    })

    info.save()
      .then( fichier => {
        console.log('Data saved ')
        res.status(200).redirect('/admin/about')
      })
      .catch( error => {
        console.log('Error to save on database')
        res.status(500).redirect('/admin/about/create');
      })
    }
}


exports.show = (req, res) => {
  Info.findById(req.params.id)
    .then(info => {
       console.log(info);
       res.status(200).render('admin/about/edit', {
         data: info,
         notification: notification
       })
    })
    .catch(err => {
      res.status(500).redirect('/admin/about');
    })
}


exports.update = (req, res) => {
  Info.updateOne({"_id": ObjectID(req.body.id)}, {$set:{"titre": req.body.title, "content": req.body.content}}, function(err, result){
    res.status(201).redirect('/admin/about');
  });
}


exports.delete = (req, res) => {
  Info.findByIdAndRemove(req.params.id, function (err) {
         if (err) return next(err);
         res.status(201).redirect('/admin/about');
  })
}
