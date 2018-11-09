import { MESSAGE } from '../types';

export default function message(state={} ,action={}) {
    switch (action.type){
      case MESSAGE:
        return action.message;
      default: return state;
    }
}
