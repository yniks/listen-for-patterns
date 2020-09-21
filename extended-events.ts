import { EventEmitter } from "events";
import  {match,pattern,target} from "object-pattern-match"
/**
 * This class extends built-in EventEmitter Class to implement
 * - Object pattern based Event Identifiers instead of traditional strings
 * @requires object-pattern-match
 */
export {pattern,target}
export class EventEmitterExtended extends EventEmitter {
    /**
     * 
     * @param opts Options for EventEmitter super constructor
     */
    #patterns: Map<pattern, { (...args: any[]): void }>
    #oneTime: Set<pattern>
    constructor(opts?: Object) {
        super(opts)
        this.#patterns = new Map
        this.#oneTime = new Set
        this.on = this.addListener
    }
    emit(...arg: [Object | string | symbol| target, ...Array<any>]) {
        if (!(arg[0] instanceof Object)) return super.emit(...arg as [string |
            symbol, ...any[]])
        else {
            let hasemitted = false
            for (let [pattern, callback] of this.#patterns) {
                if (match(pattern, arg[0] as target)) {
                    callback(arg[0]); hasemitted = true
                    if (this.#oneTime.has(pattern)) {
                        this.#oneTime.delete(pattern)
                        this.#patterns.delete(pattern)
                    }
                }
            }
            return hasemitted
        }
    }
    addListener(type: pattern | string | symbol, callback: { (...args: any[]): void }) {
        if (!(type instanceof Object)) return super.addListener(type as string | symbol, callback)
        else {
            this.#patterns.set(type, callback)
            return this
        }
    }
    removeListener(type: pattern | string | symbol, callback: { (...args: any[]): void }) {
        if (!(type instanceof Object)) return super.removeListener(type as string | symbol, callback)
        else {
            if (this.#patterns.get(type) == callback)
                this.#patterns.delete(type)
            return this
        }
    }
    once(type: pattern | string | symbol, callback: { (...args: any[]): void }) {
        if (!(type instanceof Object)) return super.addListener(type as string | symbol, callback)
        else {
            this.#oneTime.add(type)
            this.addListener(type, callback)
            return this
        }
    }
}