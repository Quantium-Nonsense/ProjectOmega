// Helper file to get an instance in the ngrx reducer
import { NGXLogger } from 'ngx-logger';

export let logger: NGXLogger;

export const initLogger = (newLogger: NGXLogger) => logger = newLogger;
