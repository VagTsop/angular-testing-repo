import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
/*
jasmine spies 
we can keep track of the number of times that a function is called
we can provide a fake implementaton and define what values to return
we can either spy on an existing object or we can create a complete mock implementation of our 
dependency

*/
describe("CalculatorService", () => {

  it("should add two numbers", () => {
    
    // spyOn is function provided by Jasmine. it is used to create a "spy" on a method of an object. A spy allows you to:
    // 1. Monitor: Check if a method was called, how many times it was called, and with what arguments.
    // 2. Intercept: Replace the actual implementation of the method with a mock implementation, which
    // can return specific values or perform specific actions.

    const logger = jasmine.createSpyObj("LoggerService", ["log"]);

    logger.log.and.returnValue(); // specify a return value for  logger.log

   // spyOn(logger, "log");

    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");
  });
});

/*
Without spyOn
When you do not use spyOn, the actual implementation of the method will be called. This means that any side effects or dependencies that the method has will be executed. For example, if fetchData makes an HTTP request, that request will actually be made during your test.

Example Without spyOn

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyComponent } from './my-component.component';
import { DataService } from './data.service';
import { of } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
  });

  it('should call fetchData and log the data', () => {
    // No spyOn here, so the actual fetchData method will be called
    const consoleSpy = spyOn(console, 'log');

    // Call the method that uses fetchData
    component.getData();

    // Verify that console.log was called with the actual data
    expect(consoleSpy).toHaveBeenCalledWith({ data: 'some data' });
  });
});

Issues Without spyOn
Dependency on External Systems: If fetchData makes an HTTP request, your test will depend on the availability and state of the external system (e.g., a server).
Slower Tests: Making actual HTTP requests or performing other I/O operations can slow down your tests significantly.
Unpredictable Results: The data returned by the actual method might change, leading to flaky tests that pass or fail unpredictably.
With spyOn
When you use spyOn, you can mock the method's implementation, allowing you to control its behavior and isolate the unit of code you are testing. This makes your tests more predictable, faster, and independent of external systems.

Example With spyOn
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyComponent } from './my-component.component';
import { DataService } from './data.service';
import { of } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [DataService]
    });

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
  });

  it('should call fetchData and log the data', () => {
    // Create a spy on the fetchData method of DataService
    spyOn(dataService, 'fetchData').and.returnValue(of({ data: 'mock data' }));

    // Spy on console.log to verify the output
    const consoleSpy = spyOn(console, 'log');

    // Call the method that uses fetchData
    component.getData();

    // Verify that fetchData was called
    expect(dataService.fetchData).toHaveBeenCalled();

    // Verify that console.log was called with the mock data
    expect(consoleSpy).toHaveBeenCalledWith({ data: 'mock data' });
  });
});

Benefits With spyOn
Isolation: The test is isolated from the actual implementation of fetchData, allowing you to focus on testing the component's logic.
Control: You can control what fetchData returns, making it easier to test different scenarios (e.g., success, failure).
Speed: The test runs faster because it does not perform actual I/O operations.
Predictability: The test results are predictable because the mocked method always returns the same data.
Summary
Without spyOn: The actual method is called, leading to potential dependencies on external systems, slower tests, and unpredictable results.
With spyOn: The method is mocked, providing isolation, control, speed, and predictability in your tests.
Using spyOn is a best practice in unit testing when you need to mock dependencies and focus on testing the specific unit of code in isolation.
*/
