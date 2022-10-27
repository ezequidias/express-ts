import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from '@dtos/categories.dto';
import { CategoryEntity } from '@entities/categories.entity';
import { HttpException } from '@exceptions/HttpException';
import { Category } from '@interfaces/categories.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class CategoryService extends Repository<CategoryEntity> {
  public async findAll(): Promise<Category[]> {
    const categories: Category[] = await CategoryEntity.find();
    return categories;
  }

  public async findById(id: number): Promise<Category> {
    if (isEmpty(id)) throw new HttpException(400, 'id is empty');

    const findCategory: Category = await CategoryEntity.findOne({ where: { id: id } });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    return findCategory;
  }

  public async create(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'categoryData is empty');

    const createcategoryData: Category = await CategoryEntity.create({ ...categoryData }).save();

    return createcategoryData;
  }

  public async update(id: number, categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'categoryData is empty');

    const findCategory: Category = await CategoryEntity.findOne({ where: { id: id } });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    await CategoryEntity.update(id, { ...categoryData });

    const updateCategory: Category = await CategoryEntity.findOne({ where: { id: id } });
    return updateCategory;
  }

  public async delete(id: number): Promise<Category> {
    if (isEmpty(id)) throw new HttpException(400, 'CategoryId is empty');

    const findCategory: Category = await CategoryEntity.findOne({ where: { id: id } });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    await CategoryEntity.delete({ id: id });
    return findCategory;
  }
}

export default CategoryService;
