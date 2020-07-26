
exports.index = (req, res) => {
  if(req.session.auth === true) {
    res.status(200).render('admin/index');
  }else{
    res.redirect('/login');
  }
}
