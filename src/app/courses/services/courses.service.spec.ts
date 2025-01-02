import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";


describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should retrieve all courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy("No courses returned");

      expect(courses.length).toBe(12, "incorrect number of courses");

      const course = courses.find((course) => course.id == 12);

      expect(course.titles.description).toBe("Angular Testing Course");
    });
    const req = httpTestingController.expectOne("/api/courses");

    expect(req.request.method).toEqual("GET");

    req.flush({payload: Object.values(COURSES)})
  });

  it("should find a course by id", () => {
    // 1. Call the findCourseById method of the coursesService with the argument 12.
    coursesService.findCourseById(12)
    .subscribe((course) => {
        // 5. This callback is executed when the Observable emits a value.
        // 6. Assert that the course object is truthy (i.e., it exists).
        expect(course).toBeTruthy();
        // 7. Assert that the id property of the course object is 12.
        expect(course.id).toBe(12);
    });

    // 2. Expect that a single HTTP request has been made to the specified URL.
    const req = httpTestingController.expectOne("/api/courses/12");

    // 3. Assert that the HTTP request method is "GET".
    expect(req.request.method).toEqual("GET");

    // 4. Simulate a server response by providing the COURSES[12] object as the response body.
    req.flush(COURSES[12]);

    // 8. Verify that there are no outstanding HTTP requests.
    httpTestingController.verify();
 });
})

/*
 outstanding HTTP request
 is one that has been made by the application but has not been matched
 by an expectation  (expectOne, expectNone, etc.) 

 or has not been completed (e.g., using flush to simulate a response).
 
 verify ensures that you havent forgot to handle some request 

*/