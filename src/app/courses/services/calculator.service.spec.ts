import { CalculatorService } from "./calculator.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {

  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach");

   
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    // used to configure our tests specks like register services for dependency injection etc
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.inject(CalculatorService); 
    /* with TestBed our tests also based on dependency injection just like the running application.
     
    what is the advantage of using TestBed when compared to calling the constructor of the calculator
    service directly?
    */
  });

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
