const Cookie = require('./lib/cookie');
/**
 * [function cookie]
 * @param  {[type]}   req  [request]
 * @param  {[type]}   res  [response]
 * @param  {Function} next [call next middleware]
 */
module.exports = function(req, res, next){
  // cookie getter
  req.cookies = {};
  (req.headers[ 'cookie' ] || '').replace(/(.*?)=(.*?)($|;)\s?/g, function(_, name, value){
    req.cookies[ unescape(name) ] = unescape(value);
  });
  /**
   * [function cookie setter]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @param  {[type]} attrs [description]
   * @return {[type]}       [description]
   */
  res.cookie = function(key, value, attrs){
    attrs = attrs || {};
    if(value === null) { attrs.expires = new Date(0); value = ''; }
    res.setHeader('Set-Cookie', Cookie(key, value, attrs).toHeader());
  };
  next();
};
