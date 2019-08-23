import { Component, OnInit } from '@angular/core';
import { Vg } from 'src/app/models/vg.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VgsService } from 'src/app/services/vgs.service';

@Component({
  selector: 'app-single-vg',
  templateUrl: './single-vg.component.html',
  styleUrls: ['./single-vg.component.scss']
})
export class SingleVgComponent implements OnInit {

  vg: Vg;

  constructor(private route: ActivatedRoute,
              private vgsService: VgsService,
              private router: Router) { }

  ngOnInit() {

    this.vg = new Vg('', '');
    const id = this.route.snapshot.params['id'];
    this.vgsService.getSingleVg(id).then(
      (vg: Vg) => {
        this.vg = vg;
      }
    );
  }

  onBack() {
    this.router.navigate(['/vgs']);
  }

}
