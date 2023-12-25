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
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {
    this._route.queryParams.subscribe({
      next: ({ product }: any) => this.productEdit = JSON.parse(product)
    });
  }

  formEditProduct() {
    this.formProduct = this._formBuilder.group({
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
    this._productService.editProduct(this.formProduct.value).subscribe({
      next: () => this._router.navigate(['/products/list']),
      error: (error) => console.log('Error editProduct', error)
    })
  }

  resetForm() {
    this.formProduct.reset({
      id: this.productEdit.id,
    });
  }

}
