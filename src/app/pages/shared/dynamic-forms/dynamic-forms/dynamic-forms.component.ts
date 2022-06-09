import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfiguration } from '../../AppConfiguration';
import { Dropdown } from '../dropdown';
import { DynamicFormBase } from '../dynamic-form-base';
import { DynamicFormControlServiceService } from '../dynamic-form-control-service.service';
import { TextboxQuestion } from '../textbox-question';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss']
})
export class DynamicFormsComponent implements OnInit {
  @Input() formData: DynamicFormBase<any>[] = [];
  @Input() reportName: string;
  @Output() searchEvent = new EventEmitter();
  form: FormGroup;
  payLoad = '';
  pdfDownloadUrl = "";
  excelDownloadUrl = "";
  canShowSearch: boolean = true;
  panelOpenState: boolean = true;
  constructor(private dynamicFormControlServiceService: DynamicFormControlServiceService, private appConfiguration: AppConfiguration) { }

  async ngOnInit() {
    this.form = this.dynamicFormControlServiceService.toFormGroup(this.formData);
    this.pdfDownloadUrl = this.appConfiguration.baseUrl + this.appConfiguration.downloadPdf + this.reportName;
    this.excelDownloadUrl = this.appConfiguration.baseUrl + this.appConfiguration.downloadExcel + this.reportName;
  }

  onSave = () => {
    this.searchEvent.emit(this.form.value);
    this.payLoad = JSON.stringify(this.form.value);
  };

  export = (url) => {
    window.open(url,"_blank")
  };

}
