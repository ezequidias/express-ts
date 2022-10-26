import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();

  constructor() {
    // this.initializeRoutes();
  }
}

export default ProductsRoute;
