import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vg } from '../models/vg.model';
import { Subscription } from 'rxjs';
import { VgsService } from '../services/vgs.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vg-list',
  templateUrl: './vg-list.component.html',
  styleUrls: ['./vg-list.component.scss']
})
export class VgListComponent implements OnInit , OnDestroy {

vgs: Vg[];

vgsSubscription: Subscription;

  constructor(private vgsService: VgsService, private router: Router) { }

  ngOnInit() {
    this.vgsSubscription = this.vgsService.vgsSubject.subscribe(
      (vgs: Vg[]) => {
        this.vgs = vgs;

      }
    );
    this.vgsService.getVgs();
    this.vgsService.emitVgs();
  }

  onNewVg() {
    this.router.navigate(['/vgs', 'new']);
  }

  onEditVg(id: number) {
  this.router.navigate(['/vgs' , 'edit', id]);
  }

  onDeleteVg(vg: Vg) {
    this.vgsService.removeVg(vg);

  }

  onViewVg(id: number) {
    this.router.navigate(['/vgs' , 'view', id]);

  }

  ngOnDestroy() {
    this.vgsSubscription.unsubscribe();
  }
}
