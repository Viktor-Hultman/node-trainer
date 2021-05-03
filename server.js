var express = require('express'),
  path = require('path'),
  app = express();


app.set('port', 3000);

//https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get('/hello', (req, res) => {
  res.send('<h2>Hello from the server!</h2>')
})


var server = app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'));
});

