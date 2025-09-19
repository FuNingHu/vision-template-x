import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PartFoundProgramComponent} from "./part-found-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('PartFoundProgramComponent', () => {
  let fixture: ComponentFixture<PartFoundProgramComponent>;
  let component: PartFoundProgramComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartFoundProgramComponent],
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

    fixture = TestBed.createComponent(PartFoundProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
