import { CalculatorService } from "./calculator.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, 
  loggerSpy: any;

  // is going to be executed before each of the specifications - two times here

  beforeEach(() => {
    console.log('Calling beforeEach');
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    calculator = new CalculatorService(loggerSpy);
  });

  it("should add two numbers", () => {

    console.log('add test');

    // const logger = jasmine.createSpyObj("LoggerService", ["log"]);

    // const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);
//
    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
   
    console.log('subtract test');
   
    /*
  initialization logic has been repeated in these 2 lines - repeated code
  for this reason we have jasmine beforeEach execution block
    
    const logger = jasmine.createSpyObj("LoggerService", ["log"]);

    const calculator = new CalculatorService(logger);
  */

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});

/*


*/
