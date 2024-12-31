import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";

/*
This is a Jasmine function that defines a test suite. The string
"CoursesService" is the name of the test suite, and the arrow 
function contains the test suite's code
*/
describe("CoursesService", () => {

  let coursesService: CoursesService;

  beforeEach(() => {

/*
TestBed is a utility provided by Angular to facilitate testing by 
creating a test module environment.
*/
    TestBed.configureTestingModule({
      providers: [
        CoursesService
    ],
    });

    coursesService = TestBed.inject(CoursesService);
  });

  it("should retrieve all courses", () => {

  });
});
/*
beforeEach Block: This is another Jasmine function that runs
before each test in the suite. It sets up the testing environment
for each test.

TestBed.configureTestingModule: This method sets up the test module
configuration. It takes an object with configuration options. 
Here, it specifies providers, which is an array of services that
should be available in the testing module. CoursesService is added to
this array, meaning it will be available for injection in the tests.

TestBed.inject(CoursesService): This method retrieves an instance
of CoursesService from the Angular dependency injection system and
assigns it to the coursesService variable. This allows the tests to 
interact with an instance of CoursesService.
In summary, this code sets up a test suite for CoursesService using 
Angular's testing utilities. It ensures that before each test, a fresh
instance of CoursesService is created and available for testing. This
setup is crucial for isolating tests and ensuring they do not affect
each other.
*/