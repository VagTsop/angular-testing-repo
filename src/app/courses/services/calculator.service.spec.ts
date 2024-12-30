import { CalculatorService } from "./calculator.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

// xdescribe() if you want to disable the complete test suite of the calculator service
// fdescribe() if we want to focus on only one particular test suite, to execute the calculator service 
// test suite containing  these two tests - when we have multiple test suites
describe("CalculatorService", () => {

  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach");

   
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.inject(CalculatorService); 
  });

 // xit() disable for example only the subtraction test
 // fit() focus on only one test and skip the others
  it("should add two numbers", () => {

    console.log("add test");

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {

    console.log("subtract test");

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
