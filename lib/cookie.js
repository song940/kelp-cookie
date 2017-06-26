/**
 * [Cookie description]
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 * @param {[type]} attrs [description]
 */
function Cookie(name, value, attrs){
  if(!(this instanceof Cookie)) 
    return new Cookie(name, value, attrs);
  if(!name)  throw new TypeError('argument name is invalid');

  this.name   = name;
  this.value  = value;

  for (var key in attrs) {
    this[key] = attrs[key];
  }
  return this;
};

Cookie.prototype.path      = "/";
Cookie.prototype.domain    = null;
Cookie.prototype.secure    = false;
Cookie.prototype.expires   = null;
Cookie.prototype.httpOnly  = true;
Cookie.prototype.overwrite = false;
/**
 * [function description]
 * @return {[type]} [description]
 */
Cookie.prototype.toString = function() {
  return [ this.name,  this.value ].join('=');
};
/**
 * [function description]
 * @return {[type]} [description]
 */
Cookie.prototype.toHeader = function() {
  var header = this.toString();
  if (this.maxAge   ) this.expires = new Date(Date.now() + this.maxAge);
  if (this.path     ) header += "; path=" + this.path;
  if (this.expires  ) header += "; expires=" + this.expires.toUTCString();
  if (this.domain   ) header += "; domain=" + this.domain;
  if (this.secure   ) header += "; secure";
  if (this.httpOnly ) header += "; httponly";
  return header;
};

module.exports = Cookie;
