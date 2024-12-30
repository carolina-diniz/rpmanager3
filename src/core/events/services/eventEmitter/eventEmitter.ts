import { EventEmitter } from "events";
import print from "../../../print/print";

export const eventEmitter = new EventEmitter();
const eventBuffer: Record<string, any[]> = {};

export function onBuffered(event: string, listener: (...args: any[]) => void) {
  print.init(__filename)

  if (!eventBuffer[event]) {
    eventBuffer[event] = [];
  }

  const buffer = eventBuffer[event];
  if (buffer.length > 0) {
    for (const args of buffer) {
      listener(...args);
    }
    eventBuffer[event] = [];
  }

  eventEmitter.on(event, listener);
}

export function emitBuffered(event: string, ...args: any[]) {
  print.init(__filename)

  if (!eventBuffer[event]) {
    eventBuffer[event] = [];
  }

  eventBuffer[event].push(args);
  eventEmitter.emit(event, ...args);
}
