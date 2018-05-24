// inject some HTML to work with
document.body.innerHTML = `
    <h4>Throttled event handling using <em>fromEvent</em> and <em>throttleTime!</em></h4>
    <button id="btn">Click me like crazy!</button> ==> [<span id="counter">0</span>]
`;

let btnClickCount = 0;
const btn = document.getElementById('btn');
const counter = document.getElementById('counter');

/***********************************************************/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

// a observable is a data channel which will stream som data
const observable = Observable
.fromEvent(btn, 'click')
.throttleTime(1000)
;

// a subscription is object which is currently subscribed to a data stream
const subscription = observable.subscribe((event) => {
    counter.innerText = ++btnClickCount;
    console.log(event, ` ==> count ${btnClickCount}`);

    if(btnClickCount >= 5) {
        // unsubscription from subscription object
        subscription.unsubscribe();
        console.warn(`unsubscribed when counter was ${btnClickCount}.`);
    }
});
