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
    , demodaysJSON
    , libraryJSON
    , startupJSON
    , featuredJSON
    , eventJSON;

    var includedIDflat = [], 
        projectList = [], 
        gamesList = [],
        demodaysList = [],
        libraryList = [],
        startupList = [],
        featuredList = [],
        eventList = [];


    function findIndex(myArray, search, prop) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][prop] === search) return i;
      }
      return -1;
    }

    /*var manualData = {


    }*/

    for (var i = 0; i < included.length; i++) {
      includedIDflat.push(included[i].id);
    }

    projects.forEach(function(project, idx) {
      var id = project.id, category = project.category, projectsLinkage;
      project.creator = [];

      /*if (manualData[id]) {
        category = manualData[id].category;
      }*/

      // jank exception for Raise Cache
      if (id === "5539c061f0b5fe7dbe393189") {
        category = "Event";
      }

      project.links.creators.linkage.forEach(function(person, personIdx) {
        
        var includedPersonIndex = includedIDflat.indexOf(person.id);
        var originalPerson = included[includedPersonIndex];
        

        //console.log(creators[creatorIndex]);





        //console.log(original.contact)

      /*  if (typeof original.contact === "undefined") {
          console.log(original)
        }
*/

        // {?} Dramatically simplify creator data
        var JekyllCreator = function(original) {
          this.name = original.name;
          this.twitter = (original.contact && original.contact.twitter) ? original.contact.twitter : false;
        }


        // TODO: need to figure out how to assign eboard / alumni
        project.creator.push(new JekyllCreator(originalPerson));
      });


      var eventId = project.links.shownAt.linkage && project.links.shownAt.linkage[0] && project.links.shownAt.linkage[0].id;
      var includedEventIndex = includedIDflat.indexOf(eventId);
      console.log(eventId)

      if (eventId !== undefined) {
        console.log("YEEE")
        //console.log()

        var originalEvent = included[includedEventIndex];

        //console.log(event.links.teams.linkage)


        // {?} Assigning DemoDays
        if (findIndex(originalEvent.links.teams.linkage, "53f99d48c66b44cf6f8f6d81", "id") > -1) {
          //console.log(event.startDateTime)

          var dateArray = originalEvent.startDateTime.split("-");

          //console.log();

          category = "DemoDays";
          project.demodays = dateArray[1] + " " + dateArray[0];
        }
      }


        console.log(project.featured)

        if (project.featured) {
          featuredList.push(project);
        }


      console.log(category);

      switch (category) {
        case "DemoDays":
          demodaysList.push(project);
          break;
        case "Library":
          libraryList.push(project);
          break;
        case "Game":
          gamesList.push(project);
          break;
        case "Event":
          eventList.push(project);
          break;
        case "Startup":
          startupList.push(project);
          break;
        default:
          projectList.push(project);
          break;
      }
    });

  //output datasets
  if (!dev) {
    try {
      featuredJSON = JSON.stringify(featuredList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/featured.yaml'), featuredJSON);

      gamesJSON = JSON.stringify(gamesList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/games.yaml'), gamesJSON);

      demodaysJSON = JSON.stringify(demodaysList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/demodays.yaml'), demodaysJSON);

      projectJSON = JSON.stringify(projectList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/projects.yaml'), projectJSON);

      libraryJSON = JSON.stringify(libraryList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/libraries.yaml'), libraryJSON);

      eventJSON = JSON.stringify(eventList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/events.yaml'), eventJSON);

      startupJSON = JSON.stringify(startupList);
      fs.writeFileSync(path.resolve(__dirname, '../../_data/startups.yaml'), startupJSON);

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