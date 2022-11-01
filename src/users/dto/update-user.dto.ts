import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ValidRoles } from '../../auth/interfaces';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsArray()
  roles?: ValidRoles[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
