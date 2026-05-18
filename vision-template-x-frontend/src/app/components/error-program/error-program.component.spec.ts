import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ErrorProgramComponent} from "./error-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ErrorProgramComponent', () => {
  let fixture: ComponentFixture<ErrorProgramComponent>;
  let component: ErrorProgramComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorProgramComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
