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
        case "---":
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
          dataMapping['creatorEboard'] = splitLine[1] === "true" ? true : false;
          break;
        case "    current":
          dataMapping['creatorEboardCurrent'] = splitLine[1] === "true" ? true : false;
          break;
        case "    role:":
          //dataMapping['creatorRole'] = splitLine[1];
          //break;
          return;
        case "    - everything":
          return;
        case "demodays:":
          if (splitLine[1] !== undefined) {
            dataMapping['shownAt'] = splitLine[1];
          }
          break;
        case "launchdate":
          return;
        default:
          if (splitLine[0].length > 20 && splitLine[1] === undefined) {
            // to exclude description assignment
            return;
          }
          dataMapping[splitLine[0]] = splitLine[1];
      }
    });
    dataMapping["description"] = data[data.length - 1];
    var dataSubmit = {
      "data": [
        {
          title: dataMapping.title || '',
          type: "projects",
          description: dataMapping.description || '',
          imgUrl: dataMapping.image || '',
          url: dataMapping.site || '',
          category: 'Game',
          featured: false,
          creators: [],
          links: {} 
          /*,
          links: {
            // creators: [] or {}
            // then type and ID
            // creator: {
            // type: people,
            //  id: 402sahflasdkfhalsdfkh
            // }
            }
          }*/
        }
      ]
    };

    

    if(!peopleNamesToPeoples[dataMapping['creatorName']]){
      var newPerson = {
        "data": [
          {
            "type": "people",
            "name": dataMapping['creatorName'],
            "contact": {
              "twitter": dataMapping['creatorTwitter']
            }
          }
        ]
      }
      request({
        'rejectUnauthorized': false,
        'method': "POST",
        'url': 'https://api.tnyu.org/v2/people',
        'headers': {
          'x-api-key': process.env.ApiKey,
          'accept': 'application/vnd.api+json',
          'content-type': 'application/vnd.api+json'
        },
        'timeout': 100000,
        'json': true,
        'body': newPerson
      }).then(function(body){
        //console.log(body);     
      }, function(err) {
        console.log(err.response.body);
      });
    } else {
      dataSubmit.data[0].creators = [];
      dataSubmit.data[0].creators.push(peopleNamesToPeoples[dataMapping['creatorName']].id);
      dataSubmit.data[0].links.creators = {};
      dataSubmit.data[0].links.creators.linkage = [];
      dataSubmit.data[0].links.creators.linkage.push(
        {'type': 'people', id: peopleNamesToPeoples[dataMapping['creatorName']].id}
      );
    }

    console.log(dataSubmit)

   // console.log(dataSubmit)
   // console.log(dataSubmit.data[0].links.creator)

    request({
        'rejectUnauthorized': false,
        'method': "POST",
        'url': 'https://api.tnyu.org/v2/projects',
        'headers': {
          'x-api-key': process.env.ApiKey,
          'accept': 'application/vnd.api+json',
          'content-type': 'application/vnd.api+json'
        },
        'timeout': 100000,
        'json': true,
        'body': dataSubmit
      }).then(function(body){
        console.log(body);
      }, function(err) {
        console.log(JSON.stringify(dataSubmit))
        console.log(err.response.body);
      })
  });
};