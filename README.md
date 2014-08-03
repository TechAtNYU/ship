#Project Schema

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

#Legacy Notes

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