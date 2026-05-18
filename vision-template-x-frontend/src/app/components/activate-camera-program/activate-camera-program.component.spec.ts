import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivateCameraComponent} from "./activate-camera-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ActivateCameraComponent', () => {
  let fixture: ComponentFixture<ActivateCameraComponent>;
  let component: ActivateCameraComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivateCameraComponent],
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

    fixture = TestBed.createComponent(ActivateCameraComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
