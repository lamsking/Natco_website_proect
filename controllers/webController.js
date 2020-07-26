const User = require('../models/users')
const Info = require('../models/infos')
const Work = require('../models/works')
const New = require('../models/news')

var notification = undefined
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

// Home page
exports.index = (req, res) => {
   res.status(200).render('website/index', {
     notification: notification
   })
};

exports.about = (req, res) => {
  res.status(200).render('website/about', {
    notification: notification
  })
}

exports.works = (req, res) => {
  res.status(200).render('website/works', {
    notification: notification
  })
}

exports.news = (req, res) => {
  res.status(200).render('website/news', {
    notification: notification
  })
}

exports.showNew = (req, res) => {
  res.status(200).render('website/details', {
    notification: notification
  })
}

exports.contact = (req, res) => {
  res.status(200).render('website/contact', {
    notification: notification
  })
}

// Login Page
exports.login = (req, res) => {
  res.status(200).render('login', {
    notification: notification
  })
};

exports.register = (req, res) => {
  res.status(200).render('register', {
    notification: notification
  })
}

exports.signup = (req, res) => {
  console.log(req.body);
  // Save user information in session variable
  req.session.nom = req.body.nom
  req.session.prenom = req.body.prenom
  req.session.email = req.body.email
  req.session.password = req.body.password
  // Request validation
  if(req.body.password != req.body.confirm) {
      return res.status(400).render('register',{
          notification: "Les mots de passe ne correspondent pas",
          data : req.session
      });
  }

  // Check if user does not exist
  User.find({email: req.body.email})
    .then(user => {
      if(user.length === 0){
        // Create a User
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            });

            // Save User in the database
            user.save()
            .then(newuser => {
              return res.status(201).render('register',{
                  notification: "Demande de "+newuser.nom+" transmis pour traitement !"
              });
            }).catch(err => {
              return res.status(500).render('register',{
                  notification: "Erreur de la soumission",
                  data : req.session
              });
            });
      }else{
        notification = "Cet email "+req.body.email+" existe deja !"
        res.status(500).render('register', {
          notification: notification
        })
      }
    })
    .catch(err => {
      notification = err.message +" Erreur , veuillez reessayer"
      res.status(500).render('register', {
        notification: notification
      })
    })

}

exports.logout = (req, res) => {

}

// Check authentification
exports.authentification= (req, res) => {
  // Check if user exit
  User.findOne({"email": req.body.email})
    .then( user => {
       // Check if password
       if(bcrypt.compareSync(req.body.password, user.password)) {
          req.session.auth = true
          console.log('We going to have access to admin panel')
          res.status(200).redirect('/admin')
       } else {
         res.status(401).render('login', {
           notification: 'Mot de passe incorrect'
         })
       }
    })
    .catch( error => {
      res.status(401).render('login', {
        notification: 'Authentification non accordee'+ error
      })
    })
};

// Inscription Page
exports.soumission = (req, res) => {
  // Save user information in session variable
  req.session.nom = req.body.nom
  req.session.prenom = req.body.prenom
  req.session.profil = req.body.profil
  req.session.email = req.body.email
  req.session.login = req.body.login
  req.session.password = req.body.password
  req.session.projet = req.body.projet || emptyArray
  req.session.motif = req.body.motif

  // Request validation
  if(req.body.password != req.body.confirm) {
      return res.status(400).render('register',{
          notification: "Les mots de passe ne correspondent pas",
          data : req.session,
          projects: allProjects
      });
  }

  // Check if user does not exist
  User.find({email: req.body.email})
    .then(user => {
      if(user.length === 0){
        // Create a User
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                nom: req.body.nom,
                prenom: req.body.prenom,
                profil: req.body.profil,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                comment: req.body.motif,
                projet: req.body.projet,
                privilege: emptyArray,
                statut: statut,
                active: false

            });

            // Save User in the database
            user.save()
            .then(newuser => {
              return res.status(201).render('index',{
                  notification: "Demande de "+newuser.nom+" transmis pour traitement !"
              });
            }).catch(err => {
              return res.status(500).render('register',{
                  notification: "Erreur de la soumission",
                  data : req.session,
                  projects: allProjects
              });
            });
      }else{
        notification = "Cet email "+req.body.email+" existe deja !"
        res.status(500).render('register', {
          projects : allProjects,
          notification: notification
        })
      }
    })
    .catch(err => {
      notification = err.message +" Erreur , veuillez reessayer"
      res.status(500).render('register', {
        projects : allProjects,
        notification: notification
      })
    })

}

// Signup
exports.inscription = (req, res) => {
  // Retrieve all projects
  Project.find()
  .then(projects => {
      allProjects = projects
  }).catch(err => {
      notification = err.message +"Impossible de se recuperer la liste des projets"
  });
  res.status(200).render('register', {
    projects : allProjects,
    notification: notification
  })
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.status(401).render('login', {
    notification: 'Impatient de vous revoir ...'
  })
};

// Admin Page
exports.administration = (req, res) => {
  if(req.session.auth === true){
    res.status(200).render('admin/index')
  }else{
    res.status(401).render('index', {
      notification: 'Authentification requise'
    })
  }

};
