import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '@dtos/products.dto';
import { ProductEntity } from '@entities/products.entity';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class ProductService extends Repository<ProductEntity> {

  public async count(): Promise<number> {
    const total: number = await ProductEntity.count();
    return total;
  }

  public async findAll(): Promise<Product[]> {
    const products: Product[] = await ProductEntity.find({ relations: ['category'] });
    return products;
  }

  public async findById(id: number): Promise<Product> {
    if (isEmpty(id)) throw new HttpException(400, 'id is empty');

    const findProduct: Product = await ProductEntity.findOne({ where: { id: id }, relations: ['category'] });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async create(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

    const createproductData: Product = await ProductEntity.create({ ...productData }).save();

    return createproductData;
  }

  public async update(id: number, productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

    const findProduct: Product = await ProductEntity.findOne({ where: { id: id } });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await ProductEntity.update(id, { ...productData });

    const updateProduct: Product = await ProductEntity.findOne({ where: { id: id } });
    return updateProduct;
  }

  public async delete(id: number): Promise<Product> {
    if (isEmpty(id)) throw new HttpException(400, 'ProductId is empty');

    const findProduct: Product = await ProductEntity.findOne({ where: { id: id } });
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await ProductEntity.delete({ id: id });
    return findProduct;
  }
}

export default ProductService;
