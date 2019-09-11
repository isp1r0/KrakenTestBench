'use strict';
const { get } = require('lodash');

const Model = require('../../models/unsafeFileUpload');

module.exports = (router) => {
  const model = new Model();

  router.get('/', (req, res) => {
    model._csrf = req.csrfToken();
    res.render('unsafeFileUpload', model);
  });

  model.sinkData.forEach(({ method, uri, sink, key }) => {
    router[method](uri, (req, res) => {
      console.log('in handler');
      const { input } = get(req, key);
      console.log('calling res.send', input);
      res.send(input);
    });
  });
};
