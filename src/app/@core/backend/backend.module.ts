import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RovData} from '../interfaces/rov.class';
import {RovService} from './services/rov.service';

const SERVICES = [
    { provide: RovData, useClass: RovService  },

];

@NgModule({
    imports: [CommonModule],
})
export class CommonBackendModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CommonBackendModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}
