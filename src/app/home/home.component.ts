import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ProductComponent, CommonModule, PaginatorModule],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  editProduct(product: Products, id: number) {
    this.productsService
      .editProduct(`https://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (err) => console.log(err),
      });
  }
  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`https://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (err) => console.log(err),
      });
  }
  addProduct(product: Products) {
    this.productsService
      .addProduct(`https://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (err) => console.log(err),
      });
  }
  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }
}
