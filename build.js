var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown');
    templates  = require('metalsmith-templates');
    //haven't installed any of this stuff yet
    Handlebars = require('handlebars'),
    fs         = require('fs');
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

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
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })
