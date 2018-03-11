require('colors')
const fs = require('fs');
const Iceberg = require('./lib/classes/iceberg')

const help = () => {
  if( process.argv[2] === '--help') {
    console.log(`----------------------------------------------------------------`.yellow)
    console.log('Hello folk, here are some useful tips:\n'.blue)
    console.log('  # ./index-linux <params>\n'.green)
    console.log('* --url : Mandatory. URL to crawl')
    console.log('* -c : Optional. Crawler mode: Goes recursively into URLs and their children until rearching max level depth given')
    console.log('* --max-level : Mandatory. Crawler mode: Max depth level to explore')
    console.log('* -s : Mandatory. Scraper mode - Extract data from the DOM with selectors')
    console.log('* --pagination : Optional. Scraper mode - Activate pagination: Paginates over the root url provided')
    console.log('* --pagination-pattern : Optional. Scraper mode - Pagination patter in the URL, Example: --pagination-patern=?page= ')
    console.log('* --max-page : Optional. Scraper mode -Max page to reach, Example: --max-page=50')
    console.log('* --selector : Optional. Element in the DOM to extract, Example: --selector=img. Default value: "a" ')
    console.log('* --attrib : Optional. Attribs of the element in the DOM to extract, Example: --attrib=src. Default value: "href"')
    console.log('* -o : Optional. Write the output in JSON format in the route provided. Example: -o=/tmp/urls.json')
    console.log('* --help : Show more info');
    console.log(`----------------------------------------------------------------`.yellow)
    process.exit(0);
  }
}
const checkArgs = () => {

  let conf = {}

  if (process.argv.includes('--help')) {
    help()
    process.exit(1);

  } else if (process.argv.length < 2 || ( !process.argv.includes('-c') && !process.argv.includes('-s') ) ) {
    console.log(`----------------------------------------------------------------`.yellow);
    console.log('No arguments supplied, usage:'.red);
    console.log('   # ./iceberg -c for crawler mode'.green);
    console.log('   # or'.green);
    console.log('   # ./iceberg -s for scraper mode'.green);
    console.log(`----------------------------------------------------------------`.yellow);
    console.log('More info:  # ./index-linux --help'.green);
    console.log(`----------------------------------------------------------------`.yellow);
    process.exit(1);
  } else {
    // if crawler mode
    if (process.argv.includes('-c') ) {
      let isFirstArg = false
      let isSecondArg = false
      for (let arg of process.argv){
        if(arg.includes('--url')){
          isFirstArg = true
        }
        if(arg.includes('--max-level')){
          isSecondArg = true
        }
      }
      if(!isFirstArg || !isSecondArg){
        console.log(`You need to provide an URL and a max level.`.yellow);
        process.exit(1);
      }
      //  console.log('   WARNING. Crawler mode'.red);
      console.log('crawler mode')
      for (let arg of process.argv) {
        // get URL
        if (arg.includes('--url') ) {
          console.log('url:',arg.split('=')[1].trim())
          conf.url = `${arg.split('=')[1].trim()}`
          conf.iteratorElement = {}
        }
        // get max level from args
        if (arg.includes('--max-level') ) {
          if( typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') {
            conf.maxLevel = `${arg.split('=')[1].trim()}`
            conf.iteratorElement.element = 'a'
          }
        }

      } // if scraper mode
    } else if (process.argv.includes('-s') ) {
      for (let arg of process.argv) {

        console.log('scraper mode')
        // get URL
        if (arg.includes('--url') ) {
          if( typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') {
            console.log('   You must provide an URL using --url argument'.red)
            process.exit(1);
          } else {
            console.log('url:',arg.split('=')[1].trim())
            conf.url = arg.split('=')[1].trim();
          }
          // get max level from args
          if ( process.argv.includes('--pagination') && process.argv.includes('--pagination-pattern') && process.argv.includes('--max-page')) {
            if( arg.includes('--pagination-pattern') && typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') {
              conf.iteratorElement.iterator = `${arg.split('=')[1].trim()}`
            } else {
              console.log(' You must provide a pagination pattern using --pagination-pattern argument'.red)
              process.exit(1);
            }
            if( arg.includes('--max-page') && typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') {
              conf.iteratorElement.maxPage =  `${arg.split('=')[1].trim()}`
            } else {
              console.log(' You must provide a max level to paginate'.red);
              process.exit(1);
            }
          }
          // selectors
          if (process.argc.includes('--selector') ){
            if( (arg.includes('--selector') && typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') ) {
              conf.selector.element = `${arg.split('=')[1].trim()}`
            }
            if(  arg.includes('--attrib') && typeof arg.split('=')[1].trim() === undefined ||  arg.split('=')[1].trim() === '') {
              conf.selector.attrib = `${arg.split('=')[1].trim()}`
            }
          } else {
            conf.selector.element = 'a'
            conf.selector.attrib = 'href'
          }
        }
      }
    }
  }
  return conf
}

const run = async () => {
  try {
    let config = checkArgs()
    const iceberg = new Iceberg(config.url)
    await iceberg.start(3,config)
    const output = iceberg.treeToObject()
    const content = JSON.stringify({output}, null, 4)
    fs.writeFileSync("./phraseFreqs.json", content, 'utf8')
    return;
  } catch (err){
    throw(err);
  }
}

run();
