[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac81eec87f874af4a205ce76fdab981c)](https://www.codacy.com/app/manuasir/nodejs-scraper?utm_source=github.com&utm_medium=referral&utm_content=manuasir/nodejs-scraper&utm_campaign=badger)
[![Build Status](https://travis-ci.org/manuasir/nodejs-scraper.svg?branch=master)](https://travis-ci.org/manuasir/nodejs-scraperr)
[![Inline docs](http://inch-ci.org/github/manuasir/nodejs-scraper.svg?branch=master)](http://inch-ci.org/github/manuasir/nodejs-scraper)
[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://gemnasium.com/badges/github.com/manuasir/nodejs-scraper.svg)](https://gemnasium.com/github.com/manuasir/nodejs-scraper)
[![Known Vulnerabilities](https://snyk.io/test/github/manuasir/nodejs-scraper/badge.svg)](https://snyk.io/test/github/manuasir/nodejs-scraper)
[![Coverage Status](https://coveralls.io/repos/github/manuasir/nodejs-scraper/badge.svg?branch=master)](https://coveralls.io/github/manuasir/nodejs-scraper?branch=master)

# scrawler (scraper+crawler)

This package works in two ways:

- Scraper mode:

```c
// create your own filter

const Scrawler = require('nodejs-scraper')
const domainsToFilter = ['mediafire','mega','ad.fly']
const configuration = {
	nextIteration: { element: 'a', cssClass: 'blog-pager-older-link' },
	payload: { element: 'a', attrib: 'href', substrings: domainsToFilter }
}
const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",configuration)
const results = await crawler.start(maxLevelDepth)

// or load a default one

const Scrawler = require('nodejs-scraper')
const confs = require('./plugins/configurations')
const configuration = confs.services('blogspot')
const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",configuration)
const results = await crawler.start(maxLevelDepth)
```
- Crawler mode:

```c
const scraper = require('nodejs-scraper')
const confs = require('./plugins/configurations')
const configuration = confs.services('crawler')
const maxLevelDepth = 2
scraper.start(maxLevelDepth)
```

