const path = require('path');

// creating middleware object
module.exports = {
  db: [],
  // start creates two routes to be used in development
  start: function(app, route) {
    // making a copy of db
    const db = this.db;
    return function() {
      // creates a route to send visualization file
      app.get(`/${route ? route : "SerVis"}`, function(req, res) {
        res.sendFile(path.join(__dirname + '/main.html'));
      })
      // creates a route to send data from db
      app.get('/ping', function(req, res) {
        res.json(db);
      })
    }
  },
  // storing request object data into db
  middleware: function(req, res, next) {
    // making copy of db
    const db = this.db;
    return function(req, res, next) {
      // time at request start
      const start = new Date().getTime();
      // after response is sent, update db with req & res data
      res.on('finish', (err, data) => {
        db.push({method: req.method, reqTime: start, elapsedTime: new Date().getTime() - start, status: res.statusCode})
      })
      next();
    }
  }
}