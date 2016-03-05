var Cookie = require('./lib/cookie');
/**
 * [function cookie]
 * @param  {[type]}   req  [request]
 * @param  {[type]}   res  [response]
 * @param  {Function} next [call next middleware]
 */
module.exports = function(req, res, next){
  // cookie getter
  req.cookies = {};
  (req.headers[ 'cookie' ] || '').split(';')
  .filter(function(cookie){
    return !!cookie;
  }).map(function(cookie){
    return cookie.split('=');
  }).forEach(function(cookie){
    req.cookies[ cookie[0] ] = cookie[1];
  });
  /**
   * [function cookie setter]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @param  {[type]} attrs [description]
   * @return {[type]}       [description]
   */
  res.cookie = function(key, value, attrs){
    res.setHeader('Set-Cookie', Cookie(key, value, attrs).toHeader());
  };
  next();
};
