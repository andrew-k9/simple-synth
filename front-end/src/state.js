/**
 * Keeps track of the state of the keyboard
 */
const KEYBOARD_STATE = {
  gainValue: null,
  stopTime: null,

  init: function(){
    this.gainValue = 0.05;
    this.stopTime = 256;
    return this;
  },

  update: function(params){
    for(const key in params){
      if(this.hasOwnProperty(key)){
        this[key] = params[key];
      } else {
        throw new Error(`State has no key ${key} in ${params} for ${this}`);
      }
    }
  }

};