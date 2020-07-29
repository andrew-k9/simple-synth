const KEYBOARD_STATE = {
  gain: null,
  stop_time: null,
  octaves: null,
  a_frequency: null,

  init: function(){
    this.gain = 0.05;
    this.stop_time = 256;
    this.octaves = 3;
    this.a_frequency = 440;
    return this;
  },

  // updates state then propagates to each of the props
  update: function(params){
    for(const key in params){
      if(this.hasOwnProperty(key)){
        this[key] = params[key];
      } else {
        throw new Error(`State has no key ${key} in ${params} for ${this}`);
      }
    }

    // update state for all html elements with a prop classname
    this.getProps().forEach( propName =>
      [...document.getElementsByClassName(propName)]
      .forEach( prop => prop.innerHTML = (this[propName] + ''))
    );
  },

  getProps: function(){
    const keys = Object.keys(this);
    return keys.filter( key => typeof this[key] !== 'function');
  },
};