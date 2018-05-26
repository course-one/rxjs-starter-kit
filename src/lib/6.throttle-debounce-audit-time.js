// inject some HTML to work with
const input = document.createElement('input');
const ul = document.createElement('ul');
input.setAttribute('placeholder', 'Type and check console');
input.style.width = '250px';
input.style.padding = '10px 15px';

document.body.append( input, ul);

/***********************************************************/

import { fromEvent } from 'rxjs';
import { pluck, map, filter, throttleTime, debounceTime, auditTime, distinctUntilChanged } from 'rxjs/operators';

// throttleTime(N) : RxJS will dispach the first event and rejects others if occured during `N` milliseconds of the previous succssful event dispatch
// auditTime(N) : RxJS will only dispatch an event after `N` milliseconds has passed, the latest one will be chosen to dispatch and others (before it) will be ignored.
// debounceTime(N) :  debouceTime maintains a timer to check if latest event is `N` milliseconds apart from last event, if it is, then dispatches the current event and ignores the previous ones. If Observable is constantly sending values that are less than `N` milliseconds apart, then no event will be emitted.

// create observable from input keyup
const observable = fromEvent( input, 'keyup' ).pipe(
    debounceTime( 1000 ),
    pluck( 'target', 'value' ),
    distinctUntilChanged() // if event.target.value is same, do not dispatch a value/event
);

// transform and subscribe
observable.subscribe( v => {
    if( v.length == 0 ) {
        return console.clear();
    }

    console.log( v );
});


