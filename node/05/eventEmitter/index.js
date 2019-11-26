class EventEmitter {
    constructor() {
        this.handler = {};
    }
    on(eventName, callback) {
        if (!this.handles) {
            this.handles = {};
        }
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(callback);
    }
    emit(eventName, ...arg) {
        if (this.handles[eventName]) {
            for (var i = 0; i < this.handles[eventName].length; i++) {
                this.handles[eventName][i](...arg);
            }
        }

    }
}

const event = new EventEmitter(); 
event.on('some_event', num =>  { 
    console.log('some_event 事件触发:'+num); 
}); 
let num = 0
setInterval(() =>  { 
    event.emit('some_event' , num ++ ); 
}, 1000); 