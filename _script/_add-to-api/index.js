// THIS SCRIPT WAS USED TO UPDATE THE API WITH THE SHIP PROJECTS STORED AS MARKDOWN
// this does not need to be run anymore, unless we remove all the projects from the API.
// keeping it for reference

var fs = require('fs');
var request = require('request-promise');

var datasets = ["demodays", "event", "game", "library", "project", "startup", "featured"];

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
  for (var j = 0; j < datasets.length; j++) {
    generateData(datasets[j]);
  }
});

var generateData = function(currentDataset){
  fs.readdir('../../_' + currentDataset, function(err, file) {
    if (err) {
      return console.log(err);
    }

    file.forEach(function(currentFile) {
        fs.readFile('../../_' + currentDataset + '/' + currentFile, 'utf8', function(errFile, data) {
          if (errFile) {
            return console.log(errFile);
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

          var isEvent = false, isDemodays = false, isFeatured = false;
          var categoryName;

          switch (currentDataset) {
            case "demodays":
            case "event":
            case "project":
            case "featured":
              categoryName = "Other";
              // TODO: this needs to create a demodays linkage for demodays
              break;
            case "demodays":
              isDemodays = true;
              break;
            case "event":
              isEvent = true;
              break;
            case "featured":
              isFeatured = true;
              break;
            default:
              categoryName = currentDataset.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
          }

          console.log(categoryName);

          dataMapping["description"] = data[data.length - 1];
          var dataSubmit = {
            "data": [
              {
                title: dataMapping.title || '',
                type: "projects",
                description: dataMapping.description || '',
                imgUrl: dataMapping.image || '',
                url: dataMapping.site || '',
                category: categoryName,
                featured: isFeatured,
                links: {} 
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
            dataSubmit.data[0].links.creators = {};
            dataSubmit.data[0].links.creators.linkage = [];
            dataSubmit.data[0].links.creators.linkage.push(
              {'type': 'people', id: peopleNamesToPeoples[dataMapping['creatorName']].id}
            );
          }

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
      });
  });
};