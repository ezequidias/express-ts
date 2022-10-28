import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class UserService extends Repository<UserEntity> {

  public async count(): Promise<number> {
    const total: number = await UserEntity.count();
    return total;
  }

  public async findAll(): Promise<User[]> {
    const users: User[] = await UserEntity.find();
    return users;
  }

  public async findById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();

    return createUserData;
  }

  public async update(userId: number, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    let hashedPassword = {}
    if (userData.password) hashedPassword = { password: await hash(userData.password, 10) };

    await UserEntity.update(userId, { ...userData, ...hashedPassword });

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async delete(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await UserEntity.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
