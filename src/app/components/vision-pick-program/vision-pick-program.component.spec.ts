import {ComponentFixture, TestBed} from '@angular/core/testing';
import {VisionPickProgramComponent} from "./vision-pick-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('VisionPickProgramComponent', () => {
  let fixture: ComponentFixture<VisionPickProgramComponent>;
  let component: VisionPickProgramComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisionPickProgramComponent],
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

    fixture = TestBed.createComponent(VisionPickProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
