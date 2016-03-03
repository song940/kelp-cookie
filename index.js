var Cookie = require('./lib/cookie');
/**
 * [function description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options){
  return function(req, res, next){
    //
    req.cookies = {};
    (req.headers[ 'cookie' ] || '').split(';').map(function(cookie){
      return cookie.split('=');
    }).forEach(function(cookie){
      req.cookies[ cookie[0] ] = cookie[1];
    });
    /**
     * [function description]
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
};
