import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule,  HttpTestingController } from "@angular/common/http/testing";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";

describe("CoursesService", () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    // 1. Configure the testing module with HttpClientTestingModule and CoursesService.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    // 2. Inject the CoursesService and HttpTestingController.
    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should retrieve all courses", () => {
    // 3. Call the findAllCourses method of the coursesService.
    coursesService.findAllCourses().subscribe((courses) => {
      // 6. This callback is executed when the Observable emits a value.
      // 7. Assert that the courses array is truthy.
      expect(courses).toBeTruthy("No courses returned");

      // 8. Assert that the length of the courses array is 12.
      expect(courses.length).toBe(12, "incorrect number of courses");

      // 9. Find the course with id 12.
      const course = courses.find((course) => course.id == 12);

      // 10. Assert that the description of the course with id 12 is "Angular Testing Course".
      expect(course.titles.description).toBe("Angular Testing Course");
    });

    // 4. Expect that a single HTTP request has been made to the specified URL.
    const req = httpTestingController.expectOne("/api/courses");

    // 5. Assert that the HTTP request method is "GET".
    expect(req.request.method).toEqual("GET");

    // 11. Simulate a server response by providing the payload with the courses data.
    req.flush({ payload: Object.values(COURSES) });
  });

  it("should find a course by id", () => {
    // 1. Call the findCourseById method of the coursesService with the argument 12.
    coursesService.findCourseById(12).subscribe((course) => {
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
  });

  it("should save the course data", () => {
    // 1. Define the changes to be made to the course.
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" },
    };

    // 2. Call the saveCourse method of the coursesService with the course id and changes.
    coursesService.saveCourse(12, changes).subscribe((course) => {
      // 6. This callback is executed when the Observable emits a value.
      // 7. Assert that the id of the course is 12.
      expect(course.id).toBe(12);
    });

    // 3. Expect that a single HTTP request has been made to the specified URL.
    const req = httpTestingController.expectOne("/api/courses/12");

    // 4. Assert that the HTTP request method is "PUT".
    expect(req.request.method).toEqual("PUT");

    // 5. Assert that the request body contains the expected changes.
    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    // 8. Simulate a server response by providing the updated course data.
    req.flush({
      ...COURSES[12],
      ...changes
    });
  });

  afterEach(() => {
    // 9. Verify that there are no outstanding HTTP requests.
    httpTestingController.verify();
  });
});

/*

*/
