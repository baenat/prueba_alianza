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
      id: [this.setProductId(), Validators.required],
      nombreProducto: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      descripcion: [null, Validators.required],
      logo: [null, Validators.required],
      fechaLiberacion: [null, Validators.required],
      fechaReestructuracion: [null]
    });
  }

  sendData() {
    console.log('this.formCreate.value => ', this.formProduct.value);
    if (this.formProduct.invalid) return;
    this.productService.registerProduct(this.formProduct.value)
    this.router.navigate(['/products/list']);
  }

  setProductId(): number {
    return this.productService.setProductId();
  }


}
