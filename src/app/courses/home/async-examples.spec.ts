import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {
  // Describe the test suite for asynchronous testing examples.

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    // Define a test case using Jasmine's done() for asynchronous testing.

    let test = false;
    // Initialize a test variable.

    setTimeout(() => {
      // Set a timeout to simulate an asynchronous operation.

      console.log('running assertions');
      // Log a message to indicate that assertions are being run.

      test = true;
      // Update the test variable.

      expect(test).toBeTruthy();
      // Assert that the test variable is true.

      done();
      // Call the done() function to indicate that the asynchronous operation is complete.
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    // Define a test case using fakeAsync to handle asynchronous operations with setTimeout.

    let test = false;
    // Initialize a test variable.

    setTimeout(() => {
      // Set a timeout to simulate an asynchronous operation.
    });

    setTimeout(() => {
      // Set another timeout to simulate an asynchronous operation.

      console.log('running assertions setTimeout()');
      // Log a message to indicate that assertions are being run.

      test = true;
      // Update the test variable.
    }, 1000);

    flush();
    // Flush pending asynchronous tasks.

    expect(test).toBeTruthy();
    // Assert that the test variable is true.
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    // Define a test case using fakeAsync to handle asynchronous operations with Promises.

    let test = false;
    // Initialize a test variable.

    console.log('Creating promise');
    // Log a message to indicate that a promise is being created.

    Promise.resolve().then(() => {
      // Create a resolved promise and chain a then() handler.

      console.log('Promise first then() evaluated successfully');
      // Log a message to indicate that the first then() handler was evaluated.

      return Promise.resolve();
      // Return another resolved promise.
    })
    .then(() => {
      // Chain another then() handler.

      console.log('Promise second then() evaluated successfully');
      // Log a message to indicate that the second then() handler was evaluated.

      test = true;
      // Update the test variable.
    });

    flushMicrotasks();
    // Flush pending microtasks (e.g., promise resolutions).

    console.log('Running test assertions');
    // Log a message to indicate that assertions are being run.

    expect(test).toBeTruthy();
    // Assert that the test variable is true.
  }));

  it('Asynchronous test example - Promises + setTimeout()', fakeAsync(() => {
    // Define a test case using fakeAsync to handle asynchronous operations with Promises and setTimeout.

    let counter = 0;
    // Initialize a counter variable.

    Promise.resolve()
      .then(() => {
        // Create a resolved promise and chain a then() handler.

        counter += 10;
        // Increment the counter by 10.

        setTimeout(() => {
          // Set a timeout to simulate an asynchronous operation.

          counter += 1;
          // Increment the counter by 1.
        }, 1000);
      });

    expect(counter).toBe(0);
    // Assert that the counter is 0.

    flushMicrotasks();
    // Flush pending microtasks (e.g., promise resolutions).

    expect(counter).toBe(10);
    // Assert that the counter is 10.

    tick(500);
    // Simulate the passage of 500 milliseconds.

    expect(counter).toBe(10);
    // Assert that the counter is still 10.

    tick(500);
    // Simulate the passage of another 500 milliseconds.

    expect(counter).toBe(11);
    // Assert that the counter is 11.
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    // Define a test case using fakeAsync to handle asynchronous operations with Observables.

    let test = false;
    // Initialize a test variable.

    console.log('Creating Observable');
    // Log a message to indicate that an Observable is being created.

    const test$ = of(test).pipe(delay(1000));
    // Create an Observable that emits the test variable after a delay of 1000 milliseconds.

    test$.subscribe(() => {
      // Subscribe to the Observable.

      test = true;
      // Update the test variable.
    });

    tick(1000);
    // Simulate the passage of 1000 milliseconds.

    console.log('Running test assertions');
    // Log a message to indicate that assertions are being run.

    expect(test).toBe(true);
    // Assert that the test variable is true.
  }));
});
