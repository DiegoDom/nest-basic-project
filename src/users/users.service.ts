import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create({
        ...createUserDto,
        password: bcryptjs.hashSync(createUserDto.password, 10),
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
          fullName: true,
          isActive: true,
          password: true,
          roles: true,
        },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`There is not records with ID ${id}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findOneById(id);

      const user = await this.usersRepository.preload({
        ...updateUserDto,
        id,
      });

      user.password = updateUserDto.password
        ? bcryptjs.hashSync(updateUserDto.password, 10)
        : user.password;

      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<void> {
    const userToBlock = await this.findOneById(id);
    userToBlock.isActive = false;
    await this.usersRepository.save(userToBlock);
  }

  private handleExceptions(error: any): never {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException(
        `Ya existe un usuario con el correo electronico proporcionado`,
      );
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected server error, report to admin',
    );
  }
}
