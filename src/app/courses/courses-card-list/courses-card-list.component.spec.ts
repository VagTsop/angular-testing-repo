import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { setupCourses } from "../common/setup-test-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

// CoursesCardListComponent --> presentational Component
describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    // 1. Configure the testing module with CoursesModule.
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
      .compileComponents() // 2. Compile the components.
      .then(() => {
        // 3. Create the component fixture.
        fixture = TestBed.createComponent(CoursesCardListComponent);
        // 4. Get the component instance from the fixture.
        component = fixture.componentInstance;
        // 5. Get the debug element from the fixture.
        el = fixture.debugElement;
      });
  }));

  it("should create the component", () => {
    // 6. Assert that the component is created.
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    // 1. Set the courses input property with test data.
    component.courses = setupCourses();

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Log the outer HTML of the debug element (for debugging purposes).
    console.log(el.nativeElement.outerHTML);

    // 4. Query the DOM for elements with the class 'course-card'.
    const cards = el.queryAll(By.css(".course-card"));

    // 5. Assert that the cards array is truthy (i.e., it exists).
    expect(cards).toBeTruthy("Could not find cards");
    // 6. Assert that the length of the cards array is 12.
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    // 1. Set the courses input property with test data.
    component.courses = setupCourses();

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Get the first course from the courses array.
    const course = component.courses[0];

    // 4. Query the DOM for the first course card element.
    const card = el.query(By.css(".course-card:first-child")),
      // 5. Query the DOM for the title element within the first course card.
      title = card.query(By.css("mat-card-title")),
      // 6. Query the DOM for the image element within the first course card.
      image = card.query(By.css("img"));

    // 7. Assert that the course card element is truthy (i.e., it exists).
    expect(card).toBeTruthy("Could not find course card");

    // 8. Assert that the text content of the title element matches the course description.
    expect(title.nativeElement.textContent).toBe(course.titles.description);

    // 9. Assert that the src attribute of the image element matches the course icon URL.
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
