// inject some HTML to work with
const input1 = document.createElement('input');
const input2 = document.createElement('input');
const nameElem = document.createElement('h3');

input1.setAttribute('placeholder', 'Type first name');
input2.setAttribute('placeholder', 'Type last name');

document.body.append( input1, input2, nameElem );

/***********************************************************/


import { fromEvent } from 'rxjs';
import { pluck, map, mergeMap, switchMap, auditTime, distinctUntilChanged } from 'rxjs/operators';

// create observable which returns value of input 1
const ob1 = fromEvent( input1, 'keyup' )
.pipe(
    pluck('target', 'value'),
    auditTime( 300 ),
    distinctUntilChanged()
);

// create observable which returns value of input 2
const ob2 = fromEvent( input2, 'keyup' )
.pipe(
    pluck('target', 'value'),
    auditTime( 300 ),
    distinctUntilChanged()
);


// create observable which merges value of input 1 with input 2
// inner observable must emit value to see merged result
ob1.pipe(
    mergeMap( v1 =>  ob2.pipe(
        map( v2 =>  v1 + ' ' + v2 )
    ) )
).subscribe( value => {
    nameElem.textContent = value;
});