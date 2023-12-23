import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '@core/models/product.model';
import { ProductService } from '@modules/products/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formProduct: FormGroup = new FormGroup({});
  productEdit: ProductModel = { id: 1, logo: '', nombreProducto: '', descripcion: '', fechaLiberacion: '' };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.route.queryParams
      .subscribe({
        next: ({ product }: any) => {
          this.productEdit = JSON.parse(product)
        }
      });
  }

  formEditProduct() {
    this.formProduct = this.formBuilder.group({
      id: [this.productEdit.id, Validators.required],
      nombreProducto: [this.productEdit.nombreProducto, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      descripcion: [this.productEdit.descripcion, Validators.required],
      logo: [this.productEdit.logo, Validators.required],
      fechaLiberacion: [this.productEdit.fechaLiberacion, Validators.required],
      fechaReestructuracion: [this.productEdit.fechaReestructuracion]
    });
  }

  ngOnInit(): void {
    this.formEditProduct();
  }

  sendData() {
    if (this.formProduct.invalid) return;
    this.productService.editProduct(this.formProduct.value);
    this.router.navigate(['/products/list']);
  }

}
