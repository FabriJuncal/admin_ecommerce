import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../../_services/categorie.service';
import { NoticyAlertComponent } from '../../../../componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {

  @Output() usersE: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$;
  isLoading = false;

  name: string;
  icono: string;
  image_file: any;
  image_preview: any;

  constructor(
    private _categorieService: CategorieService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.loadForm();
  }

  loadForm(){
  }

  processFile($event) {
    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.open(NoticyAlertComponent, { text: `danger-EL ARCHIVO CARGADO NO ES UNA IMAGEN` });
      return;
    }
  
    this.image_file = $event.target.files[0];
  
    this.readImageAsDataUrl(this.image_file)
      .then((result) => {
        this.image_preview = result;
        console.log(this.image_preview);
      })
      .catch((error) => {
        console.error('Error al leer la imagen:', error);
      });
  }

  readImageAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result as string);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }

  save(){
  }

}
