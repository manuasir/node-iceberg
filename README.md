[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac81eec87f874af4a205ce76fdab981c)](https://www.codacy.com/app/manuasir/nodejs-scraper?utm_source=github.com&utm_medium=referral&utm_content=manuasir/nodejs-scraper&utm_campaign=badger)
[![Build Status](https://travis-ci.org/manuasir/nodejs-scraper.svg?branch=master)](https://travis-ci.org/manuasir/nodejs-scraperr)
[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://gemnasium.com/badges/github.com/manuasir/nodejs-scraper.svg)](https://gemnasium.com/github.com/manuasir/nodejs-scraper)
[![Known Vulnerabilities](https://snyk.io/test/github/manuasir/nodejs-scraper/badge.svg)](https://snyk.io/test/github/manuasir/nodejs-scraper)
[![Coverage Status](https://coveralls.io/repos/github/manuasir/nodejs-scraper/badge.svg?branch=master)](https://coveralls.io/github/manuasir/nodejs-scraper?branch=master)

 **iceberg.io**

<p align="center">
  <br><br>
  <img src="https://image.ibb.co/k16qkm/onlinelogomaker_102417_1409_9889.png">
</p>

Lightweight Node.js crawler/scraper, allows to get filtered DOM data from custom iterators. This package works in two ways:

- *Scraper mode*:  load a filter or create your custom one.

```c
// gets all download links from a Blogspot URL

const Scrawler = require('iceberg')
const domainsToFilter = ['mediafire','mega','ad.fly']
const conf = {
	// iterator, it will be the next element to process
	iteratorElement: { element: 'a', cssClass: 'blog-pager-older-link' },
	// desired data to get extracted from the DOM
	payload: { element: 'a', attrib: 'href', substrings: domainsToFilter }
}

const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",conf)
const results = await crawler.start(maxLevelDepth)

// or load a default one

const Scrawler = require('iceberg')
const confs = require('./plugins/configurations')
const conf = confs.services('blogspot')
const maxLevelDepth = 10
const crawler = new Scrawler("http://someblog.blogspot.com",conf )
const results = await crawler.start(maxLevelDepth)
```
- *Crawler mode*:  Explores ALL links from a URL until the depth threshold is reached

```c
const crawler = require('nodejs-scraper')
const confs = require('./plugins/configurations')
const configuration = confs.services('crawler')
const maxLevelDepth = 2
crawler.start(maxLevelDepth)
```
