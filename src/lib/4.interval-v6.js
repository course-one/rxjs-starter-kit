// inject some HTML to work with
const ul1 = document.createElement('ul');
const ul2 = document.createElement('ul');
document.body.setAttribute('style', 'display: flex; justify-content: center;');
document.body.append(ul1, ul2);

/***********************************************************/

// RxJS version 6 import style
import { interval } from 'rxjs';
import { map, filter} from 'rxjs/operators';

// create observable from interval
// which returns a counter data every 500ms
// transform with some operators
// we need to `pipe` observable data to transform
const observable = interval( 500 ).pipe(
    map( v => v + 1),
    filter( v => v%2 == 0 ) 
);

// subscribe to observer [sub 1]
const subscription1 = observable.subscribe( ( count ) => {
    let li = document.createElement('li');
    li.innerText = `${count} [1]`;
    ul1.appendChild(li);

    console.log( 'count from sub [1] ===> ', count );
} );

// subscribe to observer [sub 2]
const subscription2 = observable.subscribe( ( count ) => {
    let li = document.createElement('li');
    li.innerText = `${count} [2]`;
    ul2.appendChild(li);

    console.log( 'count from sub [2] ===> ', count );
} );

// unsubscribe sub1 after 5s
setTimeout(() => {
    subscription1.unsubscribe();
    console.log( 'sub [1] unsubscribed' );
}, 5000);

// unsubscribe sub1 after 10s
setTimeout(() => {
    subscription2.unsubscribe();
    console.log( 'sub [2] unsubscribed' );
}, 10000);