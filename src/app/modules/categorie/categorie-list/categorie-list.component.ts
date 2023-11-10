import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../_services/categorie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategorieComponent } from '../components/add-categorie/add-categorie.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  isLoading$;

  constructor(
    private _categorieService: CategorieService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
  }

  addCategorie(){
    const modalRef = this.modelService.open(AddCategorieComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
  }

}
