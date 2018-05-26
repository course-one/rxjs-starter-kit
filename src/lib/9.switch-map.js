// inject some HTML to work with
const btn = document.createElement('button');
btn.textContent = 'Click me hassss!';
document.body.append(btn);

/***********************************************************/

import { fromEvent, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


const click$ = fromEvent(btn, 'click');
const interval$ = of(1,2,3,4,5);

click$.pipe(
    switchMap( event => interval$ )
).subscribe(num => console.log(num));