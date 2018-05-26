// inject some HTML to work with
const ul = document.createElement('ul');
const btn = document.createElement('button');
btn.textContent = 'Do not click me on same position twice.';

document.body.append(btn, ul);

/***********************************************************/

import { Subject, fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

let counter = 0;
let pos = {
    x: null,
    y: null
};

// create subject observable
// A subject gives full functionality to emit and observer data
const subject = new Subject();

// listen to data from the subject observable
subject.pipe(
    map( pos => pos.x + pos.y )
).subscribe( {
    next: v => console.log('Subject combined x + y value ===> ', v),
    error: e => console.warn('Subject error ===> ', e),
    complete: () => console.log(`Subject completed. Game ended with score ${ counter }.`)
} );

// emit some data on btn click
fromEvent( btn, 'click' )
.pipe(
    throttleTime( 100 )
)
.subscribe( ( event ) => {
    let payload = {
        x: event.clientX,
        y: event.clientY
    };

    if( payload.x === pos.x && payload.y === pos.y ) {
        return subject.error( 'You clicked on same position. Refresh to retry.' );
    }

    ++counter;
    pos = payload;
    subject.next( payload );
} );

setTimeout( () => {
    return subject.complete();
}, 10000 );
