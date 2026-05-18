import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { VisionPickProgramComponent } from './components/vision-pick-program/vision-pick-program.component';
import { VisionTemplateAppComponent } from './components/vision-template-app/vision-template-app.component';
import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PartFoundProgramComponent } from './components/part-found-program/part-found-program.component';
import { NonFoundComponent } from './components/non-found-program/non-found-program.component';
import { ErrorProgramComponent } from './components/error-program/error-program.component';
import { ActivateCameraComponent } from './components/activate-camera-program/activate-camera-program.component';

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
        { prefix: PATH + '/assets/i18n/', suffix: '.json' },
        { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({
  declarations: [
        VisionPickProgramComponent,
        PartFoundProgramComponent,
        NonFoundComponent,
        ErrorProgramComponent,
        ActivateCameraComponent,
        VisionTemplateAppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UIAngularComponentsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
            useDefaultLang: false,
        })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

  ngDoBootstrap() {
      const visionpickprogramComponent = createCustomElement(VisionPickProgramComponent, { injector: this.injector });
      customElements.define('funh-vision-template-x-vision-pick-program', visionpickprogramComponent);
      const visiontemplateappComponent = createCustomElement(VisionTemplateAppComponent, { injector: this.injector });
      customElements.define('funh-vision-template-x-vision-template-app', visiontemplateappComponent);
      const partfoundprogramComponent = createCustomElement(PartFoundProgramComponent, {injector: this.injector});
      customElements.define('funh-vision-template-x-part-found-program', partfoundprogramComponent);
      const nonfoundprogramComponent = createCustomElement(NonFoundComponent, {injector: this.injector});
      customElements.define('funh-vision-template-x-non-found-program', nonfoundprogramComponent);
      const errorprogramComponent = createCustomElement(ErrorProgramComponent, {injector: this.injector});
      customElements.define('funh-vision-template-x-error-program', errorprogramComponent);
      const activatecameraprogramComponent = createCustomElement(ActivateCameraComponent, {injector: this.injector});
      customElements.define('funh-vision-template-x-activate-camera-program', activatecameraprogramComponent);

    }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
    registerWorkersWithWebPack() {
        new Worker(new URL('./components/vision-template-app/vision-template-app.behavior.worker.ts'
            /* webpackChunkName: "vision-template-app.worker" */, import.meta.url), {
            name: 'vision-template-app',
            type: 'module'
        });
        new Worker(new URL('./components/vision-pick-program/vision-pick-program.behavior.worker.ts'
            /* webpackChunkName: "vision-pick-program.worker" */, import.meta.url), {
            name: 'vision-pick-program',
            type: 'module'
        });

        new Worker(new URL('./components/part-found-program/part-found-program.behavior.worker.ts'
            /* webpackChunkName: "part-found-program.worker" */, import.meta.url),{
            name: 'part-found-program',
            type: 'module'
        });

        new Worker(new URL('./components/non-found-program/non-found-program.behavior.worker.ts'
            /* webpackChunkName: "non-found-program.worker" */, import.meta.url),{
            name: 'non-found-program',
            type: 'module'
        });

        new Worker(new URL('./components/error-program/error-program.behavior.worker.ts'
            /* webpackChunkName: "error-program.worker" */, import.meta.url),{
            name: 'error-program',
            type: 'module'
        });

        new Worker(new URL('./components/activate-camera-program/activate-camera-program.behavior.worker.ts'
            /* webpackChunkName: "activate-camera-program.worker" */, import.meta.url),{
            name: 'activate-camera',
            type: 'module'
        });

    }
}

