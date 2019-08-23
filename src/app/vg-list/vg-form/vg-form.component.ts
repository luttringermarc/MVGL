import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VgsService } from 'src/app/services/vgs.service';
import { Router } from '@angular/router';
import { Vg } from 'src/app/models/vg.model';

@Component({
  selector: 'app-vg-form',
  templateUrl: './vg-form.component.html',
  styleUrls: ['./vg-form.component.scss']
})
export class VgFormComponent implements OnInit {

  vgForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  constructor(private formBuilder: FormBuilder,
              private vgsService: VgsService,
              private router: Router,
             ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.vgForm = this.formBuilder.group({
      title: ['', Validators.required],
      studio: ['', Validators.required]
    });
  }

  onSaveVg() {
    const title = this.vgForm.get('title').value;
    const studio = this.vgForm.get('studio').value;
    const newVg = new Vg(title, studio);
    if (this.fileUrl && this.fileUrl !== '') {
      newVg.photo = this.fileUrl;
    }
    this.vgsService.createNewVg(newVg);
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
