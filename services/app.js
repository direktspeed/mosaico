"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

// module.exports = app;
// start mos
/* global module: false, console: false, __dirname: false */
var upload = require('jquery-file-upload-middleware');
var fs = require('fs');
var _ = require('lodash');
var gm = require('gm').subClass({imageMagick: true});

var extend = require('util')._extend;

// app.use(require('connect-livereload')({ ignore: [/^\/dl/] }));
// app.use(require('morgan')('dev'));



// Upload
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '5mb',
  extended: true
}));



var uploadOptions = {
  tmpDir: '.tmp',
  uploadDir: './uploads',
  uploadUrl: '/uploads',
  imageVersions: { thumbnail: { width: 90, height: 90 } }
};

app.get('/upload/', function(req, res) {

      var files = [];
      var counter = 1;
      var finish = function () {
          if (!--counter)
              return res.json({ files: files });;
      };

      var uploadHost = req.protocol + '://' + req.get('host');

      fs.readdir(uploadOptions.uploadDir, _.bind(function (err, list) {
          _.each(list, function (name) {
              var stats = fs.statSync(uploadOptions.uploadDir + '/' + name);
              if (stats.isFile()) {
                  var file = {
                      name: name,
                      url: uploadHost + uploadOptions.uploadUrl + '/' + name,
                      size: stats.size
                  };
                  _.each(uploadOptions.imageVersions, function (value, version) {
                      counter++;
                      fs.exists(uploadOptions.uploadDir + '/' + version + '/' + name, function (exists) {
                          if (exists)
                              file.thumbnailUrl = uploadHost + uploadOptions.uploadUrl + '/' + version + '/' + name;
                          finish();
                      });
                  });
                  files.push(file);
              }
          }, this);
          finish();
      }, this));

});

app.use('/upload/', upload.fileHandler(uploadOptions));

// Image Placeholder
// imgProcessorBackend + "?src=" + encodeURIComponent(src) + "&method=" + encodeURIComponent(method) + "&params=" + encodeURIComponent(width + "," + height);
app.get('/img/', function(req, res) {

    var params = req.query.params.split(',');

    if (req.query.method == 'placeholder') {
        var out = gm(params[0], params[1], '#707070');
        res.set('Content-Type', 'image/png');
        var x = 0, y = 0;
        var size = 40;
        // stripes
        while (y < params[1]) {
            out = out
              .fill('#808080')
              .drawPolygon([x, y], [x + size, y], [x + size*2, y + size], [x + size*2, y + size*2])
              .drawPolygon([x, y + size], [x + size, y + size*2], [x, y + size*2]);
            x = x + size*2;
            if (x > params[0]) { x = 0; y = y + size*2; }
        }
        // text
        out = out.fill('#B0B0B0').fontSize(20).drawText(0, 0, params[0] + ' x ' + params[1], 'center');
        out.stream('png').pipe(res);

    } else if (req.query.method == 'resize') {
        var ir = gm(req.query.src);
        ir.format(function(err,format) {
            if (!err) res.set('Content-Type', 'image/'+format.toLowerCase());
            ir.autoOrient().resize(params[0] == 'null' ? null : params[0], params[1] == 'null' ? null : params[1]).stream().pipe(res);
        });

    } else if (req.query.method == 'cover') {
        var ic = gm(req.query.src);
        ic.format(function(err,format) {
            if (!err) res.set('Content-Type', 'image/'+format.toLowerCase());
            ic.autoOrient().resize(params[0],params[1]+'^').gravity('Center').extent(params[0], params[1]+'>').stream().pipe(res);
        });

    }

});
// Download HTML
// Send Email
app.post('/dl/', function(req, res) {
  if (req.body.action == 'download') {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.body.filename);
      res.setHeader('Content-type', 'text/html');
      res.write(req.body.html);
      res.end();
  } else if (req.body.action == 'email') {
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport(req.app.locals.emailTransport);

      var mailOptions = extend({
          to: req.body.rcpt, // list of receivers
          subject: req.body.subject, // Subject line
          html: req.body.html // html body
      }, req.app.locals.emailOptions);

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
              res.status(500).send('Error: '+error);
              res.write('ERR');
          } else {
              console.log('Message sent: ' + info.response);
              res.send('OK: '+info.response);
          }
      });
  }  else if (req.body.action == 'edit') {
    // Download Current Edited Template (Download current save)
    res.setHeader('Content-disposition', 'attachment; filename=' + req.body.filename);
    res.setHeader('Content-type', 'application/json');
    //res.write(req.body.html);
    res.end('NOT IMPLAMENTED');
  }
});

module.exports = app;
