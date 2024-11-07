const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

const loadSwaggerFiles = (directory) => {
  let apis = {};
  fs.readdirSync(directory).forEach(file => {
    if (path.extname(file) === '.yaml') {
      const contents = YAML.load(path.join(directory, file));
      if (contents.paths) {
        apis = { ...apis, ...contents.paths };
      }
    }
  });
  return apis;
};

const combineSwaggerDocs = () => {
  const apiPaths = loadSwaggerFiles('./src/swagger');
  return {
    openapi: '3.0.0',
    info: {
      title: 'Pregnancy Management API',
      description: 'API for managing pregnancy-related data',
      version: '1.0.0'
    },
    servers: [
      { url: 'http://localhost:3000/api' }
    ],
    paths: apiPaths,
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  };
};

module.exports = combineSwaggerDocs;
