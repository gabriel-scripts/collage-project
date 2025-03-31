function isSKipped() {
    return function (req, res, next) {
        console.log(req.body);
        if (req.body.skip === "true") {
            next(); 
        } else {
            res.status(400).json({ error });
        }
    };
}

function checkAccess(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    if (req.body.skip === "true") {
      return next();
    }
  
    res.redirect('/');
}

export { isSKipped, checkAccess };