exports.applicantMiddle = function (req, res, next) {
  const auth = req.session.user
  if (!auth) {
    res.redirect("/auth/login")
    return
  }
  if (auth.role !== 1) {
    res.redirect("/auth/login")
    return
  }
  next()
}
