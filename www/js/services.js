angular.module('starter.services', [])

.factory('Counters', function(LocalStorage) {

  var counters = LocalStorage.get("listOfCounters") || [];
  var activeCounter = LocalStorage.get("activeCounter") || null;

  return {

    getActiveCounter: function() {
      if ((activeCounter == null && counters.length > 0)
        || (this.get(activeCounter) == null && counters.length > 0)) {
        activeCounter = counters[0].id;
      }

      return this.get(activeCounter);
    },
    setActiveCounter: function(counter) {      
      activeCounter = counter.id;
      localStorage.setItem("activeCounter", angular.toJson(activeCounter));
    },   

    getNextCounter: function() {

      if (activeCounter != null && counters.length > 0) {

        for (var i = 0; i < counters.length; i++) {

          if (counters[i].id == activeCounter) {
            if (i < (counters.length - 1)) {
              activeCounter = counters[i+1].id;
              break;
            } else {
              activeCounter = counters[0].id;
              break;
            }
          }
        }
      }

      var counter = this.get(activeCounter);
      this.setActiveCounter(counter);
      return counter;
    },

    all: function() {
      return counters;
    },
    remove: function(counter) {
      counters.splice(counters.indexOf(counter), 1);
      this.save();
    },
    get: function(id) {
      for (var i = 0; i < counters.length; i++) {
        if (counters[i].id === parseInt(id)) {
          return counters[i];
        }
      }
      return null;
    },
    add: function(counter) {

      counter.id = 0;
      this.formatHour(counter);

      for (var i = 0; i < counters.length; i++) {
        if (counters[i].id > counter.id) {
          counter.id = counters[i].id;
        }
      }      

      counter.id = counter.id + 1;
      counters.push(counter);
      this.save();
    },
    change: function(counter) {
      this.formatHour(counter);
      oldCounter = this.get(counter.id);
      oldCounter = counter;
      this.save();
    },    
    save: function() {
      localStorage.setItem("listOfCounters", angular.toJson(counters));
    },

    formatHour: function(counter) {
      if (!counter.useDate) {
        counter.date.setHours(0,0,0,0);
      }
    },
    calculateRemainCounter: function(counter) {

      if (counter == null) {
        return;
      }

      var rest = (new Date(counter.date) - new Date());
      counter.remainDays = parseInt(rest / (24*60*60*1000));

      var rest = rest - (counter.remainDays * (24*60*60*1000));

      if (counter.useDate) {
        counter.remainHours = parseInt(rest / (60*60*1000));
        rest = rest - (counter.remainHours * (60*60*1000));

        counter.remainMinutes = parseInt(rest / (60*1000));

      } else {

        if (rest > 0) {
          counter.remainDays += 1;
        }

        counter.remainHours = 0;
        counter.remainMinutes = 0;      
      }

      if (counter.remainDays < 0) {
        counter.remainDays = 0;
      }
    }    
  };
})

.factory('LocalStorage', function() {

  if(typeof(Storage) == "undefined") {
    console.log("Sorry, your browser does not support Web Storage...");
  }

  return {

    get: function(key) {
      return JSON.parse(localStorage.getItem(key) || null);
    },

    set: function(key, value) {
      localStorage.setItem(key, angular.toJson(value));
    }    
  }
});