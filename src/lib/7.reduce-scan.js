import { of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

// create simple observable which emits numbers over time
const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9);

// create sum function
const sum = (sum, v) => sum + v;

// transform using `reduce` and print result
observable.pipe(
    reduce( sum, 0 )
).subscribe( result => console.log( 'reduced ==> ',  result) );

// transform using `scan` and print result
observable.pipe(
    scan( sum, 0 )
).subscribe( result => console.log( 'scanned ==> ',  result) );