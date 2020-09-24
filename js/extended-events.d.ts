/// <reference types="node" />
import { EventEmitter } from "events";
import { pattern, target } from "object-pattern-match";
/**
 * This class extends built-in EventEmitter Class to implement
 * - Object pattern based Event Identifiers instead of traditional strings
 * @requires object-pattern-match
 */
export { pattern, target };
declare type event = pattern | string | symbol;
declare type cb = {
    (...args: any[]): void;
};
export declare class EventEmitterExtended extends EventEmitter {
    #private;
    constructor(opts?: Object);
    emit(arg: Object | string | symbol | target, ...args: Array<any>): boolean;
    addListener(type: event, callback: cb): this;
    removeListener(type: event, callback: cb): this;
    once(type: event, callback: cb): this;
    untill(event: event, untill: event, callback: cb): this;
}
//# sourceMappingURL=extended-events.d.ts.map