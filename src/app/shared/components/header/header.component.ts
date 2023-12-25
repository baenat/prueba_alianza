import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '@shared/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchProduct: string = '';

  _router = inject(Router);
  _searchService = inject(SearchService);

  routerPage() {
    this._router.navigate(['/products/create']);
  }

  searchProducts(terms: string) {
    if (terms.trim().length > 3 || terms.trim() == '') {
      this._searchService.search(terms).subscribe({
        next: (response) => this._searchService.onResultSearch(response)
      });
    }
  }

}
