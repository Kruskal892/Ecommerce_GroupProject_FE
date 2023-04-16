import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesComponent } from './show-product-images.component';

describe('ShowProductImagesComponent', () => {
  let component: ShowProductImagesComponent;
  let fixture: ComponentFixture<ShowProductImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
