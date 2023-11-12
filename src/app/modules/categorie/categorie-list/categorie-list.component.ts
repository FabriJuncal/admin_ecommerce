import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../_services/categorie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategorieComponent } from '../components/add-categorie/add-categorie.component';
import { CategorieModel } from '../_models/categorie.model';
import { EditCategorieComponent } from '../components/edit-categorie/edit-categorie.component';
import { DeleteCategorieComponent } from '../components/delete-categorie/delete-categorie.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.scss']
})
export class CategorieListComponent implements OnInit {

  URL_IMAGE_CATEGORIE= `${environment.URL_IMAGE}/categories`;
  isLoading$;
  totalPages = 1;
  currentPage = 1;
  search: string;
  categories: CategorieModel[] = [];


  constructor(
    private _categorieService: CategorieService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._categorieService.isLoading$;
    this.allCategories();
  }

  allCategories(page = 1){
    this._categorieService.allCategories(page, this.search)
    .subscribe((resp) => {
      console.log('allCategories ->', resp);
      this.categories = resp.categories.data;
      this.totalPages = resp.total;
      this.currentPage = page; 
    })
  }

  loadPage(index){
    this.allCategories(index);
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

  editCategorie(categorie){
    const modalRef = this.modelService.open(EditCategorieComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
  }

  delete(categorie){
    const modalRef = this.modelService.open(DeleteCategorieComponent, {centered: true, size: 'sm'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
  }

}
