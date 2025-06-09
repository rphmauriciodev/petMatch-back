import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class UserService {
  private repo = new BaseRepository<User>('users', 'db.json');

  buscarPorId(id: number): User | undefined {
    return this.repo.buscarPorId(id);
  }

  atualizar(user: User) {
    this.repo.atualizar(user);
  }
}
