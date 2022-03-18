const bodyParser = require('body-parser');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const path = require('path');
const express = require('express');


const opcaoUpload = {
    encoding: 'utf-8',
    uploadDir: './uploads',
    multiples: true, // req.files to be arrays of files
}

const eventsFormidable = [
    {
      event: 'fileBegin',
      action: function (req, res, next, name, file) { 
          if(file.name){
              file.path = opcaoUpload.uploadDir +'/'+ file.name
          }
      }
    }, 
    {
      event: 'file',
      action: function (req, res, next, name, file) {
        if(file.name){
            console.log('Finalizado o upload do '+name, file.name );
        } 
      }
    }, 
    
  ];

 module.exports = app => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(formidableMiddleware(opcaoUpload, eventsFormidable));
    //deixar o express acessar a pasta de upload ( arquivo statico )
    app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
}