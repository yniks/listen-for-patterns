/// <reference types="node" />
import { EventEmitter } from "events";
import { pattern, target } from "object-pattern-match";
/**
 * This class extends built-in EventEmitter Class to implement
 * - Object pattern based Event Identifiers instead of traditional strings
 * @requires object-pattern-match
 */
export { pattern, target };
export declare class EventEmitterExtended extends EventEmitter {
    #private;
    constructor(opts?: Object);
    emit(...arg: [Object | string | symbol | target, ...Array<any>]): boolean;
    addListener(type: pattern | string | symbol, callback: {
        (...args: any[]): void;
    }): this;
    removeListener(type: pattern | string | symbol, callback: {
        (...args: any[]): void;
    }): this;
    once(type: pattern | string | symbol, callback: {
        (...args: any[]): void;
    }): this;
}
//# sourceMappingURL=extended-events.d.ts.map