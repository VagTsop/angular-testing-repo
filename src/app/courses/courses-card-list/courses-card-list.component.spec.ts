import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { setupCourses } from "../common/setup-test-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

// Presentational Component - display course list
// -----------------------------------------------
// simple take some input data and display it on the screen
// many times we avoid to test presentationalk components due to the simplicity of component and we go immediately to
// container components. This is Valid approach.
// But we might have to test them due to test coverage
// requirements in our project that is not our control

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;

  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  })); //

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    component.courses = setupCourses();

    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected");
  });

  it("should display the first course", () => {
    pending();
  });
});