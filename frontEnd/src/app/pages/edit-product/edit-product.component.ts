import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { ProductsService } from 'src/app/services/products.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  form;
  id: any;
  category: any;
  isConfirm: boolean = false;
  selectProduct: any;
  isChanged: boolean = false;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    public util: UtilsService
  ) {
    this.selectProduct = this.productService.selectProduct;

    if (!this.selectProduct) {
      router.navigate(['/admin']);
    }

    this.form = fb.group({
      title: [this.selectProduct.title, Validators.required],
      imageUrl: [this.selectProduct.imageUrl, Validators.required],
      price: [this.selectProduct.price, Validators.required],
      category: [this.selectProduct.category, Validators.required],
      detail: [this.selectProduct.detail, Validators.required],
    });
  }

  changeConfirm() {
    this.isConfirm = !this.isConfirm;

    if (this.isConfirm) {
      this.form.controls['title'].disable();
      this.form.controls['imageUrl'].disable();
      this.form.controls['price'].disable();
      this.form.controls['category'].disable();
      this.form.controls['detail'].disable();
    } else {
      this.form.controls['title'].enable();
      this.form.controls['imageUrl'].enable();
      this.form.controls['price'].enable();
      this.form.controls['category'].enable();
      this.form.controls['detail'].enable();
    }
  }

  updateProduct(button: any) {
    button.classList.add('loading');
    this.postService
      .updateProducts({ id: this.selectProduct.id, ...this.form.value })
      .then((res: any) => {
        this.router.navigate(['/admin']);
      })
      .catch((err: any) => {
        alert(err.error);
        button.classList.remove('loading');
      });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  async ngOnInit() {
    this.category = await this.postService.getCategory();
    this.category = this.category.data;
  }
}
