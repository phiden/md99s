var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown');
    templates  = require('metalsmith-templates');
    Handlebars = require('handlebars'),
    fs         = require('fs');
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    sass        = require('metalsmith-sass'),
    coffee      = require('metalsmith-coffee'),
    browserSync = require('browser-sync'),
    argv        = require('minimist')(process.argv)

    //haven't installed any of this stuff yet

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/templates/partials/nav.hbt').toString());
Handlebars.registerPartial('sidebar', fs.readFileSync(__dirname + '/templates/partials/sidebar.hbt').toString());
Handlebars.registerPartial('home_header', fs.readFileSync(__dirname + '/templates/partials/home_header.hbt').toString());

if (!argv.deploy) {
    browserSync({
        server: 'build',
        files: ['src/*.md', 'layouts/*.html', 'assets/*.css'],
        middleware: function (req, res, next) {
            build(next);
        }
    })
}

else {
    build(function () {
        console.log('Done building.');
    })
}

function build (callback) {

    Metalsmith(__dirname)
        // This is the source directory
        .source('./src')

        // This is where I want to build my files to
        .destination('./build')

        .use(markdown())
        .use(templates('handlebars'))
        .use(permalinks({
            pattern: ':collection/:title'
        }))
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

        // Build everything!
        .build(function (err) {
            var message = err ? err : 'Build complete';
            console.log(message);
            callback();
        });

}
