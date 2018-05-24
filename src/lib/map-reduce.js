// inject some HTML to work with
document.body.innerHTML = `<span id="result">0</span>`;

/***********************************************************/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

// create observable from array
const observable = Observable
.of(...[1, 2, 3, 4, 5, 6, 7, 8, 9])
.filter( n => n%2 != 0 )
.map( n => n * n )
.reduce( (sum, n) => sum + n, 0 )
;

// subscribe to an observable
observable.subscribe( {
    next: (num) => {
        document.getElementById('result').innerText = num;
        console.log('num ==> ', num);
    }
} );