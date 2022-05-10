import {Injectable} from "@angular/core";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

export interface DataTableItem {
  Station: string;
  IP_Address: string;
  Location: string;
  Used_for: string;
  ATE_SW: string;
}

@Injectable({
  providedIn: "root",
})
export class DataTableService {
  data: DataTableItem[] = [
    {Station: 'PLX#1', IP_Address: '10.55.100.199', Location: 'Plexus, MY', Used_for: 'Node', ATE_SW: '0.0.157'},
    {Station: 'PLX#2', IP_Address: '10.55.100.200', Location: 'Plexus, MY', Used_for: 'Pebble', ATE_SW: '0.0.157'},
    {Station: 'PLX#3', IP_Address: '10.55.100.203', Location: 'Plexus, MY', Used_for: 'Pebble', ATE_SW: '0.0.157'},
    {Station: 'PLX#4', IP_Address: '10.55.100.204', Location: 'Plexus, MY', Used_for: 'Node', ATE_SW: '0.0.157'},
    {Station: 'PLX#5', IP_Address: '10.55.100.155', Location: 'PLX', Used_for: 'Node/Pebble', ATE_SW: '0.0.157'},
    {
      Station: 'OPS#1 -Yuli\'s PC',
      IP_Address: '10.41.42.8',
      Location: 'ENG, IL',
      Used_for: 'Node/Pebble',
      ATE_SW: '0.0.157'
    },
    {
      Station: 'OPS#2 - Shay\'s PC-',
      IP_Address: '10.41.42.9',
      Location: 'ENG, IL',
      Used_for: 'Node/Pebble',
      ATE_SW: '0.0.157'
    },
    {Station: 'SJ#1', IP_Address: '10.20.17.96', Location: 'San Jose, US', Used_for: 'Node/Pebble', ATE_SW: '0.0.157'},
    {Station: 'SJ#2', IP_Address: '10.20.17.80', Location: 'San Jose, US', Used_for: 'Node/Pebble', ATE_SW: '0.0.157'},
    {Station: 'RN#1', IP_Address: '10.1.6.23', Location: 'France', Used_for: 'Node/Pebble', ATE_SW: '0.0.157'},
  ];

  tableData$ = new BehaviorSubject<DataTableItem[]>(this.data);

  add(station: DataTableItem) {
    this.data.push(station);
    this.tableData$.next([...this.data]);
  }

  edit(station: DataTableItem, newStation: DataTableItem) {
    if (JSON.stringify(station) === JSON.stringify(newStation)) {
      return;
    }
    this.data = this.data.map((item: DataTableItem, index) => {
      if (index === this.data.findIndex((item: DataTableItem) => JSON.stringify(station) === JSON.stringify(item))) {
        return newStation;
      }
      return item;
    });
    this.tableData$.next([...this.data]);
  }

  delete(station: DataTableItem) {
    this.data = this.data.filter((item: DataTableItem) => {
      return JSON.stringify(item) !== JSON.stringify(station)
    })
    this.tableData$.next([...this.data]);
  }
}
