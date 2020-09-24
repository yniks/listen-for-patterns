import { EventEmitter } from "events";
import  {match,pattern,target} from "object-pattern-match"
/**
 * This class extends built-in EventEmitter Class to implement
 * - Object pattern based Event Identifiers instead of traditional strings
 * @requires object-pattern-match
 */
export {pattern,target}
type event=pattern | string | symbol
type cb= { (...args: any[]): void }
export class EventEmitterExtended extends EventEmitter {
    /**
     * 
     * @param opts Options for EventEmitter super constructor
     */
    #patterns: Map<pattern, cb>
    #oneTime: Set<pattern>
    constructor(opts?: Object) {
        super(opts)
        this.#patterns = new Map
        this.#oneTime = new Set
        this.on = this.addListener
    }
    emit(arg:Object | string | symbol| target, ...args:Array<any>) {
        if (!(arg instanceof Object)) return super.emit(arg,...args )
        else {
            let hasemitted = false
            for (let [pattern, callback] of this.#patterns) {
                if (match(pattern, arg as target)) {
                    callback(arg); hasemitted = true
                    if (this.#oneTime.has(pattern)) {
                        this.#oneTime.delete(pattern)
                        this.#patterns.delete(pattern)
                    }
                }
            }
            return hasemitted
        }
    }
    addListener(type:event , callback: cb) {
        if (!(type instanceof Object)) return super.addListener(type as string | symbol, callback)
        else {
            this.#patterns.set(type, callback)
            return this
        }
    }
    removeListener(type: event, callback:cb) {
        if (!(type instanceof Object)) return super.removeListener(type as string | symbol, callback)
        else {
            if (this.#patterns.get(type) == callback)
                this.#patterns.delete(type)
            return this
        }
    }
    once(type: event, callback:cb) {
        if (!(type instanceof Object)) return super.addListener(type as string | symbol, callback)
        else {
            this.#oneTime.add(type)
            this.addListener(type, callback)
            return this
        }
    }
    untill(event:event,untill:event,callback:cb)
    {
        this.once(untill,()=>this.removeListener(event,callback))
        return this.addListener(event,callback)
    }
}