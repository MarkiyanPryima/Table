import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {DataTableItem, DataTableService} from "./data-table.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: any;

  displayedColumns = ['Station', 'IP_Address', 'Location', 'Used_for', 'ATE_SW', 'icons'];

  constructor(private dataTableService: DataTableService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    dataTableService.tableData$.subscribe((data: DataTableItem[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  doFilter(e: any) {
    this.dataSource.filter = e.value.trim().toLowerCase();
  }

  addItem() {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: {editMode: false},
    });
  }

  onEdit(row: DataTableItem) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: {editMode: true, station: row},
    });
  }

  onDelete(row: DataTableItem) {
    this.dataTableService.delete(row);
  }

}
