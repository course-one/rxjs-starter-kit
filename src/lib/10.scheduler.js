import { interval, animationFrameScheduler } from 'rxjs';

// scheduler is a mediator which takes a stream and outputs in timley order
// animationFrameScheduler will only transmit a vlue when your browser
// is read for next print (screen refresh).

interval(100, animationFrameScheduler).subscribe( console.log );