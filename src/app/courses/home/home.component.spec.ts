import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { DebugElement } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CoursesService } from "../services/courses.service";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { click } from "../common/test-utils";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category == "BEGINNER"
  );

  const advancedCourses = setupCourses().filter(
    (course) => course.category == "ADVANCED"
  );

  beforeEach(waitForAsync(() => {
    // 1. Create a spy object for CoursesService with the method 'findAllCourses'.
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
      "findAllCourses",
    ]);

    // 2. Configure the testing module with CoursesModule and NoopAnimationsModule.
    // 3. Provide the spy object as the CoursesService.
    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{ provide: CoursesService, useValue: coursesServiceSpy }],
    })
      .compileComponents() // 4. Compile the components.
      .then(() => {
        // 5. Create the component fixture.
        fixture = TestBed.createComponent(HomeComponent);
        // 6. Get the component instance from the fixture.
        component = fixture.componentInstance;
        // 7. Get the debug element from the fixture.
        el = fixture.debugElement;
        // 8. Inject the CoursesService.
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  it("should create the component", () => {
    // 9. Assert that the component is created.
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    // 1. Set up the spy to return beginner courses.
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Query the DOM for elements with the class 'mdc-tab'.
    const tabs = el.queryAll(By.css(".mdc-tab"));

    // 4. Assert that there is only one tab (for beginner courses).
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only advanced courses", () => {
    // 1. Set up the spy to return advanced courses.
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Query the DOM for elements with the class 'mdc-tab'.
    const tabs = el.queryAll(By.css(".mdc-tab"));

    // 4. Assert that there is only one tab (for advanced courses).
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display both tabs", () => {
    // 1. Set up the spy to return all courses.
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Query the DOM for elements with the class 'mdc-tab'.
    const tabs = el.queryAll(By.css(".mdc-tab"));

    // 4. Assert that there are two tabs (one for beginner courses and one for advanced courses).
    expect(tabs.length).toBe(2, "Expected to find 2 tabs");
  });

  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {
    // 1. Set up the spy to return all courses.
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Query the DOM for elements with the class 'mdc-tab'.
    const tabs = el.queryAll(By.css(".mdc-tab"));

    // 4. Simulate a click on the second tab (advanced courses).
    click(tabs[1]);

    // 5. Trigger change detection to update the view.
    fixture.detectChanges();

    // 6. Flush pending asynchronous tasks.
    flush();

    // 7. Query the DOM for elements with the class 'mat-mdc-card-title' within the active tab.
    const cardTitles = el.queryAll(
      By.css(".mat-mdc-tab-body-active .mat-mdc-card-title")
    );

    console.log(cardTitles);

    // 8. Assert that there are card titles found.
    expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");

    // 9. Assert that the first card title contains the text 'Angular Security Course'.
    expect(cardTitles[0].nativeElement.textContent).toContain(
      "Angular Security Course"
    );
  }));

  it("should display advanced courses when tab clicked - async", waitForAsync(() => {
    // 1. Set up the spy to return all courses.
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    // 2. Trigger change detection to update the view.
    fixture.detectChanges();

    // 3. Query the DOM for elements with the class 'mdc-tab'.
    const tabs = el.queryAll(By.css(".mdc-tab"));

    // 4. Simulate a click on the second tab (advanced courses).
    click(tabs[1]);

    // 5. Trigger change detection to update the view.
    fixture.detectChanges();

    // 6. Wait for all asynchronous tasks to complete.
    fixture.whenStable().then(() => {
      console.log("called whenStable() ");

      // 7. Query the DOM for elements with the class 'mat-mdc-card-title' within the active tab.
      const cardTitles = el.queryAll(
        By.css(".mat-mdc-tab-body-active .mat-mdc-card-title")
      );

      // 8. Assert that there are card titles found.
      expect(cardTitles.length).toBeGreaterThan(
        0,
        "Could not find card titles"
      );

      // 9. Assert that the first card title contains the text 'Angular Security Course'.
      expect(cardTitles[0].nativeElement.textContent).toContain(
        "Angular Security Course"
      );
    });
  }));
});
