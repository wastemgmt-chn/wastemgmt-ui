import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbListModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbUserModule,NbToggleModule } from '@nebular/theme';
import { TableGenericComponent } from './table-generic/table-generic.component';
import { ActionPopupComponent } from './action-popup/action-popup.component';
import { ResponseModalComponent } from './response-modal/response-modal.component';
import { ResponseModalService } from './response-modal/response-modal.service';
import { MaterialModule } from "./material.module";
import { PageHeaderComponent } from './page-header/page-header.component';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MultiSelectComponent } from './multi-select/multi-select.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectDynamicComponent } from './multi-select-dynamic/multi-select-dynamic.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms/dynamic-forms.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { DynamicFormTemplateComponent } from './dynamic-forms/dynamic-form-template/dynamic-form-template.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbToggleModule,
    NbAccordionModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
   NgxMatSelectSearchModule,
  ],
  exports : [
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbToggleModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableGenericComponent,
    ActionPopupComponent,
    ResponseModalComponent,
    PageHeaderComponent,
    MaterialModule,
    NgxMatSelectSearchModule,
    MultiSelectComponent,
    MultiSelectDynamicComponent,
    DynamicFormsComponent,
    FileUploadComponent,
    SearchFilterComponent,
    SidebarComponent,
    DropdownSearchComponent,
    FilterComponent

  ],
  declarations:[
    TableGenericComponent,
    ActionPopupComponent,
    ResponseModalComponent,
    PageHeaderComponent,
    MultiSelectComponent,
    MultiSelectDynamicComponent,
    DynamicFormsComponent,
    FileUploadComponent,
    SearchFilterComponent,
    SidebarComponent,
    DynamicFormTemplateComponent,
    DropdownSearchComponent,
    FilterComponent

],
  entryComponents: [ActionPopupComponent],
  providers: [ResponseModalService],
})
export class SharedModule { }
