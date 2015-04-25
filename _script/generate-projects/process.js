var request = require('request')
  , fs      = require('fs')
  , sys     = require('sys')
  , path    = require('path');


  var dev = false;

//the processing
request({
  //this disables the ssl security (would accept a fake certificate). see:
  //http://stackoverflow.com/questions/20082893/unable-to-verify-leaf-signature
  "rejectUnauthorized": false,
  'url': 'https://api.tnyu.org/v2/projects?include=creators,shownAt',
  'headers': {
    'x-api-key': process.env.ApiKey,
    'accept': 'application/vnd.api+json'
  },
  timeout: 100000
}, function(err, response, body) {

  //console.log(body);


  var apiJson = JSON.parse(body)
    , projects = apiJson["data"]
    , included = apiJson["included"]
    , gamesJSON
    , projectJSON
    , demodaysJSON;

    var includedIDflat = [], 
        projectList = [], 
        gamesList = [],
        demodaysList = [];

    for (var i = 0; i < included.length; i++) {
      //console.log(included[i])
      includedIDflat.push(included[i].id);
    }

    projects.forEach(function(project, idx) {
      var id = project.id, category = project.category, projectsLinkage;
      project.creator = [];

      project.links.creators.linkage.forEach(function(person, personIdx) {
        //console.log(peopleIDflat.indexOf(person.id));

        var includedPersonIndex = includedIDflat.indexOf(person.id);
        

        
        var eventId = project.links.shownAt.linkage && project.links.shownAt.linkage[0] && project.links.shownAt.linkage[0].id;


        var includedEventIndex = includedIDflat.indexOf(eventId);

        //console.log(creators[creatorIndex]);

        var originalPerson = included[includedPersonIndex];

        console.log(eventId)

        if (eventId !== undefined) {
          console.log("YEEE")
          //console.log()

          var event = included[includedEventIndex];

          //console.log(event.links.teams.linkage)


          function findIndex(myArray, search, prop) {
            for (var i = 0; i < myArray.length; i++) {
              if (myArray[i][prop] === search) return i;
            }
            return -1;
          }

          if (findIndex(event.links.teams.linkage, "53f99d48c66b44cf6f8f6d81", "id") > -1) {
            console.log("this was shown at demodays");

            //console.log(event.startDateTime)

            var dateArray = event.startDateTime.split("-");

            //console.log();

            category = "DemoDays";
            project.demodays = dateArray[1] + " " + dateArray[0];
          }
        }

        //console.log(original.contact)

      /*  if (typeof original.contact === "undefined") {
          console.log(original)
        }
*/
        var JekyllCreator = function(original) {
          this.name = original.name;
          this.twitter = (original.contact && original.contact.twitter) ? original.contact.twitter : false;
        }

        // TODO: need to figure out how to assign eboard / alumni

        //project.creator.push(new JekyllCreator(creators[creatorIndex]));*/

        project.creator.push(new JekyllCreator(originalPerson));
      });

      console.log(category);

      switch (category) {
        case "Game":
          gamesList.push(project);
          break;
        case "DemoDays":
          demodaysList.push(project);
          break;
        default:
          projectList.push(project);
          break;
      }
    });

  //console.log(gamesList)

    //console.log(creators)


 

  //output merged events
  if (!dev) {
    try {

      gamesJSON = JSON.stringify(gamesList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/games.yaml'), gamesJSON);

      demodaysJSON = JSON.stringify(demodaysList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/demodays.yaml'), demodaysJSON);

      projectJSON = JSON.stringify(projectList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/projects.yaml'), projectJSON);

      //rebuild jekyll
      var parentDir = path.resolve(__dirname, '../../');
      var exec = require('child_process').exec;
      var puts = function (error, stdout, stderr){
        sys.puts(stdout)
      };
      exec("jekyll build", {cwd: parentDir}, puts);
    }

    catch(e) {
      console.log(e)
      console.log('ERROR');
      //something went wrong converting the json...
      //just don't update the old file.
    }
  }

 
});
