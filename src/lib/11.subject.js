import { Subject, BehaviorSubject } from 'rxjs';

// Subject returns an observable, but unlike Observable.create,
// any outsider can push data using `.next` method on it.
// When an observer subscribe to Subject observable, it does not get data unless someone push it.
// BehavourSubject on other hand initialized with initial value. When a observer subscribes to BehaviourSubject
// observer, it gets this initial value. This value is replaced with new value every time observable invoked with `next` method.
// Hence, if somebody subscribes to this observable, subscriber gets the latest transmitted value.

//const observable = new Subject();
const observable = new BehaviorSubject(0);

// prints `0` immediately
observable.subscribe(console.log);

// transmits `1` and gets printed ASAP in above subscriber
setTimeout(() => {
    observable.next(1);
}, 2000);

// new subscriber gets `1` instead of `0` because last transmitted value is `1`
setTimeout(() => {
    observable.subscribe(console.warn);
}, 4000);