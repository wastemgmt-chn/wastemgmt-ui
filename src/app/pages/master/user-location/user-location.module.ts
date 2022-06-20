import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationComponent } from './user-location.component';
import { UserLocationRoutes } from './user-location.routing';
import { AgmCoreModule} from '@agm/core'
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    UserLocationRoutes,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA4F9JYoct7v7oGvirzAx7_oK6XkNyL1oM'
    })

  ],
  declarations: [
    UserLocationComponent
  ],
  bootstrap: [ UserLocationModule ]

})
export class UserLocationModule { }
