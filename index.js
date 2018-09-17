const Cookie = require('./cookie');
/**
 * [function cookie]
 * @param  {[type]}   req  [request]
 * @param  {[type]}   res  [response]
 * @param  {Function} next [call next middleware]
 */
function cookie(req, res, next){
  // cookie getter
  req.cookies = Cookie.parse(req.headers['cookie']);
  /**
   * [function cookie setter]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @param  {[type]} attrs [description]
   * @return {[type]}       [description]
   */
  res.cookie = function(key, value, attrs = {}){
    if(value === null) { attrs.expires = new Date(0); value = ''; }
    res.setHeader('Set-Cookie', Cookie(key, value, attrs).toHeader());
  };
  next();
};

cookie.Cookie = Cookie;
cookie.parse = Cookie.parse;
module.exports = cookie;