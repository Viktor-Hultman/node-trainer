var express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser');

app.set('port', 3000);

const foodList = [
  {
    id: Date.now(),
    name: 'Bacon',
    taste: 'Delicious'
  }
];

const vowelCounter = (string, res) => {
  let counter = 0;
  for(let i = 0; i < string.length; i++)  {
    //Using .includes on a string is a more compact, exactly the same way of doing as below
    if ("aeiouyåäö".includes(string[i])) {
      counter++
    }
    //This was the basic way I did it before using .includes
    // if(string[i] === "a"){
    //   counter ++;
    // }
    // if(string[i] === "e"){
    //   counter ++;
    // }
    // if(string[i] === "i"){
    //   counter ++;
    // }
    // if(string[i] === "o"){
    //   counter ++;
    // }
    // if(string[i] === "u"){
    //   counter ++;
    // }
    // if(string[i] === "y"){
    //   counter ++;
    // }
    // if(string[i] === "å"){
    //   counter ++;
    // }
    // if(string[i] === "ä"){
    //   counter ++;
    // }
    // if(string[i] === "ö"){
    //   counter ++;
    // }
  }
  return res.send({'numner of vowels':  counter})
}

//https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
app.get('/random', (req, res) => {
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  res.json({'number': Math.floor(Math.random() * 1023) + 1});
});

//http://expressjs.com/en/api.html#req
app.get('/random/:num', (req, res) => {
  res.send({'number': Math.floor(Math.random() * req.params.num) + 1});
});

//https://medium.com/@haybams/build-a-restful-api-with-node-js-and-express-js-d7e59c7a3dfb
// Denna länk är för både get requestet och post requestet under
app.get('/food_list', (req, res) => {
  res.send({
    'list': foodList
  });
});

app.post('/add_food', (req, res) => {
  const newFood = {
    id: Date.now(),
    name: req.body.name,
    taste: req.body.taste
  };

  //https://stackoverflow.com/a/44048398
  let obj = foodList.find(x => x.name === newFood.name)
  if(obj === undefined) {
    foodList.push(newFood);
    res.send({ success: true, message: 'Added food to list'})
  } else {
    res.send({ success: false, message: 'That food is alredy on the list'})
  }

})


app.post('/vowel_counter', (req, res) => {
  vowelCounter(req.body.string, res)
})


var server = app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'));
});

