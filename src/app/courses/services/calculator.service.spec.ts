
// In Jasmine tests are known as specifications  or specs and they are grouped in test suites (like describe function)

describe("CalculatorService", () => {

  it("should add two numbers", () => {

    pending();
  });

  it("should add subtract two numbers", () => {
    pending();
  });
});

// ng test
//---------
/*  
- To run these tests, you would typically use a test runner like Karma or simply 

- Specification (Spec): A single test case that checks a specific behavior.
- Test Suite: A collection of related specs.
-Jasmine Functions:
  describe: Defines a test suite.
  it: Defines a specification.

- pending() --> simulate pending state - test will not run 
    - fail() --> simulate fail state
    - by default karma test will runner run in hot reload - means when you save it will get the change.
      ng test --no-watch --> to run the specifications without hot reload on save
      angular cli will exit in the end and it will display just the report if we use --no-watch flag
 */