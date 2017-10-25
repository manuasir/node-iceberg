[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ac81eec87f874af4a205ce76fdab981c)](https://www.codacy.com/app/manuasir/nodejs-scraper?utm_source=github.com&utm_medium=referral&utm_content=manuasir/nodejs-scraper&utm_campaign=badger)
[![Build Status](https://travis-ci.org/manuasir/nodejs-scraper.svg?branch=master)](https://travis-ci.org/manuasir/nodejs-scraper)
[![Code-Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://gemnasium.com/badges/github.com/manuasir/nodejs-scraper.svg)](https://gemnasium.com/github.com/manuasir/nodejs-scraper)
[![Known Vulnerabilities](https://snyk.io/test/github/manuasir/nodejs-scraper/badge.svg)](https://snyk.io/test/github/manuasir/nodejs-scraper)
[![Coverage Status](https://coveralls.io/repos/github/manuasir/nodejs-scraper/badge.svg?branch=develop)](https://coveralls.io/github/manuasir/nodejs-scraper?branch=develop)
 **iceberg.io**

<p align="center">
  <br><br>
  <img src="https://image.ibb.co/k16qkm/onlinelogomaker_102417_1409_9889.png">
</p>

Lightweight Node.js crawler/scraper, allows to get filtered DOM data from custom iterators. This package works in two ways:

- *Scraper mode*:  Get custom data from a loaded filter or .

```c
// gets all download links from a Blogspot URL

const Iceberg = require('iceberg')
const domainsToFilter = ['mediafire','mega','ad.fly']
const conf = {
	// Iterator: Element that gets you to the next URL to process.
	iteratorElement: { element: 'a', cssClass: 'blog-pager-older-link' },
	// Desired data to get extracted from the DOM. Example: Download links in certain domains
	payload: { element: 'a', attrib: 'href', substrings: domainsToFilter }
}
// Max Level Depth to explore
const maxLevelDepth = 10
const crawler = new Iceberg("http://someblog.blogspot.com",conf)
const results = await crawler.start(maxLevelDepth)

// or load the filter

const Iceberg = require('iceberg')
const confs = require('./plugins/configurations')
const conf = confs.services('blogspot')
const maxLevelDepth = 10
const crawler = new Iceberg("http://someblog.blogspot.com",conf )
const results = await crawler.start(maxLevelDepth)
```
- *Crawler mode*:  Explores ALL links from a URL until the depth threshold is reached

```c
const Iceberg = require('iceberg')
const confs = require('./plugins/configurations')
const crawler = new Iceberg('http://reddit.com')
const conf = confs.services('crawler')
const maxLevelDepth = 2
crawler.start(maxLevelDepth,conf)
```
