import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.buscarPorId(id);
  }
}
