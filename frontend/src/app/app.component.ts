import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common'; // Importar módulos comunes

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule] // Asegúrate de importar CommonModule para usar directivas como *ngFor
})
export class AppComponent implements OnInit{
  title = 'frontend';
  products: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

}

