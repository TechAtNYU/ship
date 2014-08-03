techatnyu ships
======================

##Schema

	layout: [layout]
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
	inactive: false

Media is tentative

##People Schema

For eboard and alumni collections. Tenative, should align with platform.

	title: Person Name
	school: NYU
	major: Major?
	image: /lib/img/person.jpg
	position: Lead of thing
	positionURL: http://www.techatnyu.org/position
	twitter: someperson
	email: t@NYU email?
	graduate: 2015

##Collections

Of the collections, we will have:

- Project
- Startup
- Library
- Event
- Game

Plus

- Eboard
- Alumni

Which are just for individuals.

###Project
Basic category. One-off and ongoing projects: *Beytrader*

###Startup
Incorporated, living the dream, possibly exited: *Branch*

Layout differences:

- Status (active, exited, etc)
- ?

###Library
For all y'all to develop with: *Phys.js*

- Language

###Event
An event that's really cool: *Raise Cache*

- Date
- Time
- Location
- Media coverage

###Game
Games!: *Heads Up Hot Dogs*

- Platform
- Where to get

##Development

- Jekyll 2.0
- LESS

-----

##Legacy Notes

Notes on the migration

###DD legacy schema

	layout: post
	title: Test
	site: http://www.test.com
	image: /lib/img/projects/test.jpg
	category: demo
	whichdd: February 2014
	maker:
	- name: Some Person
	- school: NYU 
	- twitter: someperson
  
### legacy Ship schema

	layout: post
	title: Test
	creator: Some Person
	school: NYU
	twitter: false
	site: http://www.test.com
	image: /lib/img/projects/test.jpg
	featured: false
	demodays: true
	eboard: false
	alumni: false