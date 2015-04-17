var fs = require('fs');
var request = require('request-promise');

var peopleNamesToPeoples = {};
request({url: 'https://api.tnyu.org/v2/teams?include=memberships', 
  "rejectUnauthorized": false,
  'url': 'https://api.tnyu.org/v2/people',
  'headers': {
    'x-api-key': process.env.ApiKey,
    'accept': 'application/vnd.api+json'
  },
  timeout: 100000,
}).then(function(peopleBody) {
  var people = JSON.parse(peopleBody).data;
  for (var i = 0; i < people.length; i++) {
      var currentPerson = people[i];
      peopleNamesToPeoples[currentPerson.name] = currentPerson;
  }
  game();
});

var game = function(){
  fs.readFile('../_game/heads-up-hot-dogs.md', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.split("\n");
    delete data[0]; delete data[1];
    var dataMapping = {};
    data.forEach(function(eachLine) {
      var splitLine = eachLine.split(": ");
      switch (splitLine[0]) {
        case "creator:":
          return;
        case "  - name":
          dataMapping['creatorName'] = splitLine[1];
          break;
        case "    school":
          dataMapping['creatorSchool'] = splitLine[1];
          break;
        case "    twitter":
          dataMapping['creatorTwitter'] = splitLine[1];
          break;
        case "    eboard":
          dataMapping['creatorEboard'] = splitLine[1];
          break;
        case "    current":
          dataMapping['creatorEboardCurrent'] = splitLine[1];
          break;
        case "    role":
          dataMapping['creatorRole'] = splitLine[1];
          break;
        case "    - everything":
          dataMapping['creatorEverything'] = splitLine[1];
          break;
        case "demodays":
          dataMapping['creatorEverything'] = splitLine[1];
          break;
        default:
          dataMapping[splitLine[0]] = splitLine[1];
      }
    });
    dataMapping["description"] = data[data.length - 1];
    var dataSubmit = {
      title: dataMapping.title || '',
      description: dataMapping.description || '',
      imgUrl: dataMapping.image || '',
      url: dataMapping.site || '',
      category: 'Game',
      featured: false,
      creators: []
    };
    if(!peopleNamesToPeoples[dataMapping['creatorName']]){
      var newPerson = {
        "name": dataMapping['creatorName'],
        "contact": {
          "twitter": dataMapping['creatorTwitter']
        }
      }
      request({
        'rejectUnauthorized': false,
        'method': "POST",
        'url': 'https://api.tnyu.org/v2/people',
        'headers': {
          'x-api-key': process.env.ApiKey,
          'accept': 'application/vnd.api+json'
        },
        'timeout': 100000,
        'json': true,
        'body': newPerson
      }).then(function(err, httpResponse, body){
        console.log(httpResponse);
      })
    } else {
      dataSubmit.creators.insert(peopleNamesToPeoples[dataMapping['creatorName']].id)
    }
  });
};

/*var request = require('request')
  , fs      = require('fs')
  , sys     = require('sys')
  , path    = require('path')
  , moment  = require('moment-timezone');

//the processing
request.post({
  //this disables the ssl security (would accept a fake certificate). see:
  //http://stackoverflow.com/questions/20082893/unable-to-verify-leaf-signature
  "rejectUnauthorized": false,
  'url': 'https://api.tnyu.org/v2/projects',
  'headers': {
    'x-api-key': process.env.ApiKey,
    'accept': 'application/vnd.api+json'
  },
  timeout: 100000,
  formData: formData
}, function(err, httpResponse, body) {

});
*/