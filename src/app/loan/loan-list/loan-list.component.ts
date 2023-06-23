import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { LoanService } from '../loan.service';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { GameService } from 'src/app/game/game.service';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  loans: Loan[];
  clients: Client[];
  games: Game[];
  filterClient: Client;
  filterGame: Game;
  filterDate: string;
  @ViewChild('fromInput', {read: MatInput}) fromInput: MatInput;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = [
    'id',
    'title',
    'name',
    'startDate',
    'endDate',
    'action',
  ];

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    let gameId = this.filterGame != null ? this.filterGame.id : null;
    let clientId = this.filterClient != null ? this.filterClient.id : null;
    let date = this.filterDate != null ? this.filterDate : null;

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    this.gameService.getGames().subscribe((games) => (this.games = games));

    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService
      .getLoans(pageable, gameId, clientId, date)
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });
  }

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;
    this.fromInput.value = '';

    this.onSearch();
  }

  onSearch(): void {
    this.loadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onSearch();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar préstamo',
        description:
          'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }

  inputDateEvent(event) {
    this.filterDate = event.value.toISOString();
  }

  changeDateEvent(event) {
    this.filterDate = event.value.toISOString();
  }
}
