import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolLot } from 'src/app/models/symbol-lot.model';
import { MatDialog } from '@angular/material/dialog';
import { LotService } from 'src/app/services/lot.service';
import { DialogTransactionComponent } from 'src/app/components/dialogs/dialog-transaction/dialog-transaction.component';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'
  ],
})
export class WatchlistComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private portfolioService: PortfolioService,
    private lotService: LotService,
    private activatedRoute: ActivatedRoute,
  ) { }

  @Output()
  updateLots = new EventEmitter();

  name = ''
  portfolio: Portfolio;
  lots: Lot[];
  portfolioSymbs: SymbolLot[];
  panelOpenState = true;
  id: number;

  @ViewChild('transaction')
  private transaction: TransactionsComponent;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id')
    })
    this.getPortfolio(this.id);
    this.getPortfolioSymbs(this.id);
  }



  openDialog() {
    const dialog = this._dialog.open(DialogTransactionComponent, {
      width: "450px", disableClose: true, data: null
    });
    dialog.afterClosed().subscribe(newLot => {
      if (newLot != null) {
        newLot.idPortfolio = this.portfolio.id
        this.lotService.save(newLot).subscribe(() => this.getPortfolioSymbs(this.portfolio.id))
        this.transaction.getLots(this.id);
      }
    });
  }

  getPortfolio(id) {
    this.portfolioService.getPortfolio(id).subscribe(portfolio => {
      this.portfolio = portfolio;
      this.name = portfolio.name;
    })
  }

  getPortfolioSymbs(id) {
    this.portfolioService.getPortfolioSymbs(id).subscribe(resp => this.portfolioSymbs = resp)
  }


  filterTable(filter) {
    this.portfolioService.getPortfolioSymbsByBroker(this.id, filter).subscribe(resp => this.portfolioSymbs = resp)
    console.log(this.portfolioSymbs.length)
  }

  currentlyOpenedItemIndex = -1;

  setOpened(itemIndex) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

}
