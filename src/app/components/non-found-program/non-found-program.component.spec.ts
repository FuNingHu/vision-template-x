import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NonFoundComponent} from "./non-found-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('NonFoundComponent', () => {
  let fixture: ComponentFixture<NonFoundComponent>;
  let component: NonFoundComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonFoundComponent],
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

    fixture = TestBed.createComponent(NonFoundComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
