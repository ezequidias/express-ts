import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';
import categoryService from '@services/categories.service';
import productService from '@services/products.service';

class IndexController {
  public userService = new userService();
  public categoryService = new categoryService();
  public productService = new productService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const total_users: number = await this.userService.count();
      const total_categories: number = await this.categoryService.count();
      const total_products: number = await this.productService.count();

      res.status(200).json({ data: { total_users, total_categories, total_products }, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
