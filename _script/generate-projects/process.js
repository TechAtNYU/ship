var request = require('request')
  , fs      = require('fs')
  , sys     = require('sys')
  , path    = require('path');

//the processing
request({
  //this disables the ssl security (would accept a fake certificate). see:
  //http://stackoverflow.com/questions/20082893/unable-to-verify-leaf-signature
  "rejectUnauthorized": false,
  'url': 'https://api.tnyu.org/v2/projects?include=creators',
  'headers': {
    'x-api-key': process.env.ApiKey,
    'accept': 'application/vnd.api+json'
  },
  timeout: 100000
}, function(err, response, body) {

  //console.log(body);


  var apiJson = JSON.parse(body)
    , projects = apiJson["data"]
    , creators = apiJson["included"]
    , gamesJSON
    , projectJSON;

    var peopleIDflat = [], 
        projectList = [], 
        gamesList = [];

    for (var i = 0; i < creators.length; i++) {
      peopleIDflat.push(creators[i].id);
    }

    projects.forEach(function(project, idx) {
      var id = project.id, category = project.category, projectsLinkage;
      project.creator = [];

      project.links.creators.linkage.forEach(function(person, personIdx) {
        //console.log(peopleIDflat.indexOf(person.id));

        var creatorIndex = peopleIDflat.indexOf(person.id);

        var JekyllCreator = function(original) {
          this.name = original.name;
          //this.twitter = original.contact.twitter ? original.contact.twitter || null;
        }

        // TODO: need to figure out how to assign eboard / alumni

        project.creator.push(new JekyllCreator(creators[creatorIndex]));
      });

      switch (category) {
        case "Game":
          gamesList.push(project);
          break;
        default:
          projectList.push(project);
          break;
      }
    });

    //console.log(creators)


 /* var currentEventsList = [],
      pastEventsList = [],
      allEventsList = [];

  events.forEach(function(event, idx) {
    var id = event.id, presentersLinkage;

    //explicitly set dates' timezone to nyc
    event.endDateTime = moment.tz(event.endDateTime, 'America/New_York').format();
    event.startDateTime = moment.tz(event.startDateTime, 'America/New_York').format();

    //add past event property to hide / move past events
    event.isPast = moment(event.endDateTime).isBefore(moment());

    if(manualData[id]) {
      event.isBusiness = manualData[id].isBusiness;
      event.priority   = manualData[id].priority;
    }

    //add presenter data into each events
    //this is slower than if we first read the presenters into an object
    //keyed by id, which we could then read in constant time. But whatever.
    try { presentersLinkage = event.links.presenters.linkage; }
    catch(e) { presentersLinkage = []; }

    event.presenters = presentersLinkage.map(function(linkageObject) {
      return presenters.filter(function(it) { return it.id === linkageObject.id; })[0];
    });

    // Check if event happened before the cutoff (currently 3 months ago)
    var eventTime = moment(event.endDateTime)
      , eventMonth = eventTime.month()
      , eventYear = eventTime.year()
      , currentYear = moment().year()
      , currentMonth = new Date().getMonth();

    var cutOff = currentMonth > 3 ? [currentMonth - 3, currentYear] : [12 + (currentMonth - 3), currentYear - 1];
    var cutOffMoment = moment({month: cutOff[0], year: cutOff[1]});
    var isAfterCutoff = eventTime.isAfter(cutOffMoment);

    if (!isAfterCutoff) {
      pastEventsList.push(event);
    } else {
      currentEventsList.push(event);
    }

    allEventsList.push(event);
  });*/

  //output merged events
 try {
    /*finalJSON = JSON.stringify(currentEventsList);
    fs.writeFileSync(path.resolve(__dirname, '../../_data/current.yaml'), finalJSON);

    pastJSON = JSON.stringify(pastEventsList);
    fs.writeFileSync(path.resolve(__dirname, '../../_data/past.yaml'), pastJSON);

    allJSON = JSON.stringify(allEventsList);
    fs.writeFileSync(path.resolve(__dirname, '../../_data/all.yaml'), allJSON);*/

    gamesJSON = JSON.stringify(gamesList);
    fs.writeFileSync(path.resolve(__dirname, '../../_data/games.yaml'), gamesJSON);

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
});
