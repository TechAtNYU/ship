# Ship

[![Circle CI](https://circleci.com/gh/TechAtNYU/ship/tree/master.svg?style=svg)](https://circleci.com/gh/TechAtNYU/ship/tree/master)

## Do not delete this reference branch until Ship is completely running on API

#Project Schema

	layout: post
	title: Name of Project
	image: /lib/img/projects/whatever.jpg
	site: http://www.test.com
	creator:
	  - name: Some Person
	    school: NYU
	    twitter: someperson
	    eboard: true
	    current: false
		role:
		- XYZ
		- ZYX
		- ABC
	  - name: Another Person
	    school: NYU
		twitter: anotherperson
		eboard: true
		current: true
		role:
		- ABC
	launchdate: August 2014
	demodays: April 2014
	media:
	  - unordered list of media
	  - facebook
	  - whatever
	bucket: [layout]
	inactive: false


Tentative:

- media
- role (creator)
- launchdate

Bucket means original category, this is used for featured posts.

#People Schema

For eboard and alumni collections. Tenative, should align with platform.

###E-board

	title: Person Name
	school: NYU
	major: Major?
	image: /lib/img/person.jpg
	position: Lead of thing
	positionURL: http://www.techatnyu.org/position
	twitter: someperson
	email: t@NYU email?
	graduate: 2015
	weight [int 1-10]

Weight is the way we force sort the grid, in an ugly double for loop. This is based off the [old team page](https://tech-nyu.squarespace.com/team/). As of now, weights correspond to:

1. President
2. Chair
3. External
4. Internal
5. Other school liasons

Within each weight, it sorts alphabetically.

###Alumni

Alumni is very similar, with the addition of "now", which shows off what alumni are doing nowadays:

	now: Javelin
	nowURL: http://www.javelin.com

Also, instead of our 1-10 loop, we have a count from 1-20. We reserve the first 10 for presidents, in order:

1. Trevor
2. Ben
3. Vivek
4. Kim
5. (Emanuel)
6. (Ethan)

etc.

We start our alumni sorting at 11, sorted by the year the alumni left tech@NYU. I don't know peoples' tenures exactly (except for the latest batch) so we'll have to add this in.

1. 2009-2010
2. 2010-2011
3. 2011-2012
4. 2012-2013
5. 2013-2014

----

#Collections

All project layouts should be interchangeable with any other category. The irrelevant metadata will not render. This is important: in the case of "Featured", you can drop in any project from any other bucket. (May need to add "bucket" to YML)

Of the collections, we will have:

- Featured
- DemoDays
- Library
- Project
- Game
- Event
- Startup

Plus individuals:

- Eboard
- Alumni

###Featured

Anything noteworthy or new. Updated (how often? weekly? monthly? every semester?)

###DemoDays

DemoDays projects **from NYU students**. The main DemoDays archives are on [demodays.co](http://demodays.co/archives). We limit it to NYU students because of previous concerns that we were co-opting other schools' production on ship.**techatnyu**.org

###Library
For all y'all to develop with: *Phys.js*

Layout differences:

- Language

###Project
Basic category. One-off and ongoing projects: *Beytrader*

###Game
Games!: *Heads Up Hot Dogs*

Layout differences:

- Platform
- Where to get

###Event
An event that's really cool: *Raise Cache*

Layout differences:

- Date
- Time
- Location
- Media coverage

###Startup
Incorporated, living the dream, possibly exited: *Branch*

Layout differences:

- Status (active, exited, etc)
- ?

----

#Development

- Jekyll 2.0
- LESS
- CircleCI
