import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormResetService } from '../form-reset.service';
import { KeyTerm } from '../model/KeyTerm';
import {Reloader} from "../reloader";
import {UiComponent} from "../ui-component";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-keyterms',
  templateUrl: './keyterms.component.html',
  styleUrls: ['./keyterms.component.css']
})
export class KeytermsComponent extends UiComponent implements OnInit {

  keyterms: Array<KeyTerm>;
  selectedKeyTerm: KeyTerm;
  action: string;
  loadingData = true;
  message = 'Please wait... getting the list of KeyTerms';
  reloader: Reloader;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private formResetService: FormResetService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.setRole(this.authService.getRole());
    this.reloader = new Reloader((msg) => this.message = msg, () => this.loadData());
    this.loadData();
  }

  loadData(): void {
    this.dataService.getKeyTerms().subscribe(
      (next) => {
        this.keyterms = next;
        this.loadingData = false;
        this.processUrlParams();
      },
      (error) => {
        this.reloader.tryToReloadOrLog(error);
      }
    )
  }

  private processUrlParams(): void {
    this.route.queryParams.subscribe(
      (params) => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          this.selectedKeyTerm = this.keyterms.find(keyTerm => keyTerm.id === idAsNumber);
        }
        this.action = params['action'];
        if (this.action === 'add') {
          this.selectedKeyTerm = new KeyTerm();
          this.action = 'edit';
          this.formResetService.resetKeyTermFormEvent.emit(this.selectedKeyTerm);
        }
      }
    )
  }

  setSelectedKeyTerm(keyTermId: number): void {
    this.router.navigate(['keyterms'], {queryParams: {id: keyTermId, action: 'view'}});
  }

  addKeyTerm(): void {
    this.router.navigate(['keyterms'], {queryParams: {action: 'add'}});
  }
}
