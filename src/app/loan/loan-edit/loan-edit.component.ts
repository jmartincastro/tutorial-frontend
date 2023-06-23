import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { GameService } from 'src/app/game/game.service';
import { ClientService } from 'src/app/client/client.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validDate, validateDate } from 'src/app/app.validators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss'],
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  clients: Client[];
  games: Game[];
  daterForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameService: GameService,
    private clientService: ClientService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    if (this.data.loan != null) {
      this.loan = Object.assign({}, this.data.loan);
      this.loan.startDate = new Date(this.data.loan.startDate);
      this.loan.endDate = new Date(this.data.loan.endDate);
    } else {
      this.loan = new Loan();
    }

    this.gameService.getGames().subscribe((games) => {
      this.games = games;

      if (this.loan.game != null) {
        let gameFilter: Game[] = games.filter(
          (game) => game.id == this.data.loan.game.id
        );
        if (gameFilter != null) {
          this.loan.game = gameFilter[0];
        }
      }
    });

    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;

      if (this.loan.client != null) {
        let clientFilter: Client[] = clients.filter(
          (client) => client.id == this.data.loan.client.id
        );
        if (clientFilter != null) {
          this.loan.client = clientFilter[0];
        }
      }
    });

    this.daterForm = new FormGroup({
      start: new FormControl(this.loan.startDate, [
        Validators.required,
        validDate
      ]),
      end: new FormControl(this.loan.endDate, [
        Validators.required,
        validDate
      ]),
    }, { validators: validateDate });
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe(response => {
      this.dialogRef.close();
    }, err => {
      debugger;
      if (err.status == 400) {
        swal.fire('Error guardar préstamo', err.error.mensaje, 'error');
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  inputStartDateEvent(event) {
    this.loan.startDate = event.value;
  }

  changeStartDateEvent(event) {
    this.loan.startDate = event.value;
  }

  inputEndDateEvent(event) {
    this.loan.endDate = event.value;
  }

  changeEndDateEvent(event) {
    this.loan.endDate = event.value;
  }

  public hasErrorForm = (errorName: string) => {
    return this.daterForm.errors?.[errorName];
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.daterForm.controls[controlName].hasError(errorName);
  };
}
