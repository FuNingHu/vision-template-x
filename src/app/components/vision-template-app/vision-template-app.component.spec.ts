import {ComponentFixture, TestBed} from '@angular/core/testing';
import { VisionTemplateAppComponent} from "./vision-template-app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('VisionTemplateAppComponent', () => {
  let fixture: ComponentFixture<VisionTemplateAppComponent>;
  let component: VisionTemplateAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisionTemplateAppComponent],
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

    fixture = TestBed.createComponent(VisionTemplateAppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
