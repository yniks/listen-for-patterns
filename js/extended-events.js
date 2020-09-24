"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterExtended = void 0;
const events_1 = require("events");
const object_pattern_match_1 = require("object-pattern-match");
class EventEmitterExtended extends events_1.EventEmitter {
    constructor(opts) {
        super(opts);
        this.#patterns = new Map;
        this.#oneTime = new Set;
        this.on = this.addListener;
    }
    /**
     *
     * @param opts Options for EventEmitter super constructor
     */
    #patterns;
    #oneTime;
    emit(arg, ...args) {
        if (!(arg instanceof Object))
            return super.emit(arg, ...args);
        else {
            let hasemitted = false;
            for (let [pattern, callback] of this.#patterns) {
                if (object_pattern_match_1.match(pattern, arg)) {
                    callback(arg);
                    hasemitted = true;
                    if (this.#oneTime.has(pattern)) {
                        this.#oneTime.delete(pattern);
                        this.#patterns.delete(pattern);
                    }
                }
            }
            return hasemitted;
        }
    }
    addListener(type, callback) {
        if (!(type instanceof Object))
            return super.addListener(type, callback);
        else {
            this.#patterns.set(type, callback);
            return this;
        }
    }
    removeListener(type, callback) {
        if (!(type instanceof Object))
            return super.removeListener(type, callback);
        else {
            if (this.#patterns.get(type) == callback)
                this.#patterns.delete(type);
            return this;
        }
    }
    once(type, callback) {
        if (!(type instanceof Object))
            return super.addListener(type, callback);
        else {
            this.#oneTime.add(type);
            this.addListener(type, callback);
            return this;
        }
    }
    untill(event, untill, callback, finishedcb = () => { }) {
        this.once(untill, () => { this.removeListener(event, callback); finishedcb(); });
        return this.addListener(event, callback);
    }
}
exports.EventEmitterExtended = EventEmitterExtended;
//# sourceMappingURL=extended-events.js.map