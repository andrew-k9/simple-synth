/**
 * Keeps track of the state of the keyboard
 */
const KEYBOARD_STATE = {
  gainValue: null,
  stopTime: null,
  octaves: null,
  A: null,

  init: function(){
    this.gainValue = 0.05;
    this.stopTime = 256;
    this.octaves = 3;
    this.A = 440;
    return this;
  },

  update: function(params){
    console.log( 'update', params)
    for(const key in params){
      if(this.hasOwnProperty(key)){
        this[key] = params[key];
      } else {
        throw new Error(`State has no key ${key} in ${params} for ${this}`);
      }
    }
    console.log('after update', this)
  },

  getValues: function(){
    const keys = Object.keys(this);
    return keys.filter( key => typeof this[key] !== 'function');
  },

  serverMap: function({gain, stop_time, a_frequency}) {
    return {
      gainValue: gain,
      stopTime: stop_time,
      A: a_frequency
    }
  }

};
