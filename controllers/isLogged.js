function isLogged() {
    return function (req, res, next) {
      if (req.isAuthenticated && req.isAuthenticated()) {
        return next(); 
      }
      res.redirect('/');
    };
  }
  
  export { isLogged };