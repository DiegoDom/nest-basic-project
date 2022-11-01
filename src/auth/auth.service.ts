import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { LoginDto, RegisterDto } from './dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'No se encontraron coincidencias con estas credenciales',
      );
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        'No se encontraron coincidencias con estas credenciales',
      );
    }

    // ? Generar el JWT
    const jwt = this.generateJwt({ uid: user.id });

    return {
      jwt,
      user,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // ? Crear el usuario
    const user = await this.usersService.create(registerDto);

    // ? Generar el JWT
    const jwt = this.generateJwt({ uid: user.id });

    return {
      user,
      jwt,
    };
  }

  renewJWT(user: User): AuthResponse {
    return { user, jwt: this.generateJwt({ uid: user.id }) };
  }

  private generateJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User does not exist or is not active');
    }

    return user;
  }
}
