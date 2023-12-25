import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@modules/products/services/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  formProduct: FormGroup = new FormGroup({});
  productId: number = this.setProductId();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formCreateData();
  }

  formCreateData() {
    this.formProduct = this.formBuilder.group({
      id: [this.productId, Validators.required],
      nombreProducto: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      descripcion: [null, Validators.required],
      logo: [null, Validators.required],
      fechaLiberacion: [null, Validators.required],
      fechaReestructuracion: [null]
    });
  }

  sendData() {
    if (this.formProduct.invalid) return;
    this.productService.registerProduct(this.formProduct.value).subscribe({
      next: () => this.router.navigate(['/products/list']),
      error: (error) => console.log('Error registerProduct', error)
    });
  }

  setProductId(): number {
    return this.productService.setProductId();
  }

  resetForm() {
    this.formProduct.reset({
      id: this.productId,
    });
  }

}
