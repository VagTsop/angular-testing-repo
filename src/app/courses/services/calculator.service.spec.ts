import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {

  it("should add two numbers", () => {

    // STEPS
    //-------
    // 1 --> setup phase where we are preparing the components or services that we want to test
    const calculator = new CalculatorService(new LoggerService());

     // 2 --> execution phase where we are going to trigger the operation that we want to test
    const result = calculator.add(2, 2);

    // 3--> write a series of test assetions that are either going to fail or they are going to be succesfull marking
    // the test accordingly
    expect(result).toBe(4);
  });
      //Jasmine Functions:
    //expect: Makes an assertion about the expected outcome.

  it("should subtract two numbers", () => {

    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, 'unexpected subtraction result');
  });
});
