const CATEGORY_STATE = {
  init: function(){
    this.array = [];
  },

  mutate: function(name){
    this.array.push(name)
  },

  update: function(params){
    // update state for all html elements with a prop classname
    this.array.forEach( propName =>
      [...document.getElementsByClassName(propName)]
      .forEach( prop => prop.innerHTML = (this[propName] + ''))
    );
  }
}