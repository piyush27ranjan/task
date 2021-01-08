// Problem statement 
// Step 1:
// Create an 'eventing' library out of the
// Events class.  The Events class should
// have methods 'on', 'trigger', and 'off'.

// Step 2:
// Log the trigger events in the Mongo DB 
// The schema will store all events triggered (including off), the document
// structure would look like:
// { event :"click",
//   triggerTime: timestamp 
//  }

//Step 3
// Print all logging in app.log file, in below pattern
// e.g. event --> event timestamp

//Note: You can use https://mlab.com/ to use store events in sandbox free version of mongodb or you can setup you own mongodb. 

class Events {

  constructor(){
    this.events = new Object();
  }

  // Register an event handler
  on(eventName, callback) {
    if(!this.events[eventName]){
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
  trigger(eventName) {
    if(this.events[eventName]){
      this.events[eventName].forEach(callback => {
        callback();
      })
    }
  }

  // Remove all event handlers associated
  // with the given eventName
  off(eventName) {
    this.events[eventName] = [];
  }
}