var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown');
    templates  = require('metalsmith-templates');
    Handlebars = require('handlebars'),
    fs         = require('fs');
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),

    //haven't installed any of this stuff yet

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/templates/partials/nav.hbt').toString());
Handlebars.registerPartial('sidebar', fs.readFileSync(__dirname + '/templates/partials/sidebar.hbt').toString());
Handlebars.registerPartial('home_header', fs.readFileSync(__dirname + '/templates/partials/home_header.hbt').toString());

Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(sass({
        outputStyle: 'compressed'
    }))
    .use(coffee())
    .metadata({
      site: {
        name: "phiden.net: jewelry &amp; other things",
        description: "phiden is sophia dengo, indie jeweler, knitter, sewist, &amp; general maker of things."
      }
    })
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })
