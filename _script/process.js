var request = require('request')
  , fs      = require('fs')
  , sys     = require('sys')
  , path    = require('path');


  var dev = false;


  function sortAlpha(array, property) {
    array.sort(function (a, b) {
      if (a[property] > b[property]) {
        return 1;
      }
      if (a[property] < b[property]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return array;
  }

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

    var manualData = {
      // Raise Cache
      "5539c061f0b5fe7dbe393189": {
        "category": "Event"
      }
    }

    // {?} Flat ID array for included resources
    for (var i = 0; i < included.length; i++) {
      includedIDflat.push(included[i].id);
    }

    projects.forEach(function(project, idx) {
      var id = project.id, category = project.category, projectsLinkage;
      project.creator = [];

      // {?} assign events
      if (manualData[id]) {
        category = manualData[id].category;
      }

      // {?} loop through included people to assign Name and Twitter
      project.links.creators.linkage.forEach(function(person, personIdx) {
        
        var includedPersonIndex = includedIDflat.indexOf(person.id);
        var originalPerson = included[includedPersonIndex];
      
        // {?} dramatically simplify creator data
        var JekyllCreator = function(original) {
          this.name = original.name;
          this.twitter = (original.contact && original.contact.twitter) ? original.contact.twitter : false;
          this.eboard = original.roles.indexOf("TEAM_MEMBER") > -1 ? true : false;
        }

        // TODO: need to figure out how to assign alumni
        // this will be a lot of data entry on the API

        project.creator.push(new JekyllCreator(originalPerson));
      });

      // {?} display creators alphabetically
      sortAlpha(project.creator, "name");

      // {?} for projects shown at DemoDays
      var eventId = project.links.shownAt.linkage && project.links.shownAt.linkage[0] && project.links.shownAt.linkage[0].id;
      var includedEventIndex = includedIDflat.indexOf(eventId);

      if (eventId !== undefined) {
        var originalEvent = included[includedEventIndex];

        // {?} Assigning DemoDays
        if (findIndex(originalEvent.links.teams.linkage, "53f99d48c66b44cf6f8f6d81", "id") > -1) {
          var dateArray = originalEvent.startDateTime.split("-");

          //console.log();

          category = "DemoDays";
          project.demodays = dateArray[1] + " " + dateArray[0];

          // TODO: the link assignment which happens in app.js right now can be done here
        }
      }

      // {?} for Featured projects
      // featured is independent of category
      if (project.featured) {
        featuredList.push(project);
      }

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
      featuredJSON = JSON.stringify(sortAlpha(featuredList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/featured.yaml'), featuredJSON);

      demodaysJSON = JSON.stringify(sortAlpha(demodaysList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/demodays.yaml'), demodaysJSON);

      libraryJSON = JSON.stringify(sortAlpha(libraryList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/libraries.yaml'), libraryJSON);

      projectJSON = JSON.stringify(sortAlpha(projectList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/projects.yaml'), projectJSON);

      gamesJSON = JSON.stringify(sortAlpha(gamesList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/games.yaml'), gamesJSON);

      eventJSON = JSON.stringify(sortAlpha(eventList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/events.yaml'), eventJSON);

      startupJSON = JSON.stringify(sortAlpha(startupList, "title"));
      fs.writeFileSync(path.resolve(__dirname, '../_data/startups.yaml'), startupJSON);

      //rebuild jekyll
      var parentDir = path.resolve(__dirname, '../');
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