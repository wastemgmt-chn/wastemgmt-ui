import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() valOptions:any=[];
  @Input() colOptions:any=[];
   @Output() selectedData:any=new EventEmitter();
   selectedCol:any={};
   selectedVal:any={};
  filterForm:FormGroup;


  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      col: [""],
      val: [""],
    });
  }

  onColumnChange=(event)=>{
     this.selectedVal={};
  }

  onValueChange=(event)=>{
  }

  onSave(){
    this.filterForm.patchValue({
      col:this.selectedCol,
      val:this.selectedVal
    })
   let data = this.filterForm.value;
   this.selectedData.emit(data);
  }

}
