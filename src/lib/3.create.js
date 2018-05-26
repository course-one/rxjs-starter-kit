// inject some HTML to work with
const ul = document.createElement('ul');
document.body.appendChild(ul);

/***********************************************************/

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

let counter = 0;

// create custom observable
const observable = Observable.create( ( observer ) => {
    setInterval(() => {
        if (counter == 5) {
            return observer.complete();
        }
        else if (counter == 6) {
            ++counter;
            return observer.error( new Error('Error in observable') );
        }

        // .next method emits the data
        observer.next( ++counter );
    }, 1000);
} ).map( v => v * v );

// observer to observe changes
// observer is a simple object with few methods to listen data change
const observer = {
    next( value ){
        let li = document.createElement('li');
        li.innerText = `${ counter } * ${ counter } ===>  ${ value }`;
        ul.appendChild(li);
    },
    error: ( err ) => console.warn( "err ===> ", err ),
    complete: () => console.log( '----COMPLETED----' )
};

// subscribe to data
// return subscription object
const subscription = observable.subscribe( observer );

// remove subscription (unsubscribe) after 10s
setTimeout(() => {
    subscription.unsubscribe();
    console.log(`unsubscribed when counter was ${counter}.`);
}, 10000);
