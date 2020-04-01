import { Component, OnInit, ViewChild } from '@angular/core';
import { Cartera } from 'src/app/models/cartera.model';
import { Operacion } from 'src/app/models/operacion.model';
import { DataSourceService } from 'src/app/services/dataSource.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {

  constructor(public data: DataSourceService) { }

  cartera: Cartera;
  operaciones: Operacion[] = [];

  ngOnInit() {
    this.cargarCartera();
    console.log(this.cargarOperaciones());
    this.operaciones = this.cargarOperaciones();

  }

  cargarOperaciones() {

    return this.operaciones = this.data.getOperaciones();

  }
  cargarCartera() {

    this.cartera = this.data.getCartera()[0];

  }

}
