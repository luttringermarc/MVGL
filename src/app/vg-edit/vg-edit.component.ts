import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,} from '@angular/forms';
import { VgsService } from 'src/app/services/vgs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vg } from 'src/app/models/vg.model';

@Component({
  selector: 'app-vg-edit',
  templateUrl: './vg-edit.component.html',
  styleUrls: ['./vg-edit.component.scss']
})
export class VgEditComponent implements OnInit {

  vgEdit: FormGroup;
  vg: Vg;
  fileIsUploading: boolean = false;
  fileUrl: string;
  fileUploaded: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private vgsService: VgsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }










  initForm() {
    this.vgEdit = this.formBuilder.group({
      title: [[''], Validators.required],
      studio: [[''], Validators.required]
    });
  }

  onEditVg() {
    const title = this.vg.title;
    const studio = this.vg.studio;
    const editVg = new Vg(title, studio);

    if (this.fileUrl && this.fileUrl !== '') {
      editVg.photo = this.fileUrl;
    }
    this.vgsService.editVg(this.vg);
    this.router.navigate(['/vgs']);
  }







  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.vgsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }

    );

  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
