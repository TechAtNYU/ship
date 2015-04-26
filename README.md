# Ship

[![Circle CI](https://circleci.com/gh/TechAtNYU/ship/tree/master.svg?style=svg)](https://circleci.com/gh/TechAtNYU/ship/tree/master)

# Projects

Ship projects are now fully generated from the API. To generate the right data, run:

`cd _script`
`node process.js`

---


#Development

- Jekyll 2.0
- LESS
- CircleCI


----


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