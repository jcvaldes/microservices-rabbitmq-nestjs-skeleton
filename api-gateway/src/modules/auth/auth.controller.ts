import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthRegistroUsuarioDto } from './dtos/auth-registro-usuario.dto';
import { AuthLoginUsuarioDto } from './dtos/auth-login-usuario.dto';
import { AwsCognitoService } from '../aws/aws-cognito.service';

@Controller('auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async registro(@Body() authRegistroUsuarioDto: AuthRegistroUsuarioDto) {
    return await this.awsCognitoService.registrarUsuario(
      authRegistroUsuarioDto,
    );
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUsuarioDto: AuthLoginUsuarioDto) {
    return await this.awsCognitoService.autenticarUsuario(authLoginUsuarioDto);
  }
}
