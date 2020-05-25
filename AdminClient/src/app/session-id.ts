import { v4 as uuidv4 } from 'uuid';

export const getSessionID = () => {
  if(!sessionStorage.get('sessionId')) {
    sessionStorage.setItem('sessionId', uuidv4())
  }
  return sessionStorage.get('sessionId');
};
