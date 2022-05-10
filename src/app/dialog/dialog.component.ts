import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataTableItem, DataTableService} from "../data-table/data-table.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {
  editMode: boolean | undefined;
  // @ts-ignore
  @ViewChild('myForm', {static: false}) form: NgForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { editMode: boolean, station: DataTableItem }, private dataTableService: DataTableService) {
  }

  ngOnInit(): void {
    this.editMode = this.data.editMode;
  }

  ngAfterViewInit() {
    if (this.editMode) {
      setTimeout(() => {
        this.form.setValue(this.data.station);
      })
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.dataTableService.edit(this.data.station, this.form.value);
    } else {
      this.dataTableService.add(this.form.value);
    }
  }

}
