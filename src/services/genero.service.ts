import { Injectable } from '@nestjs/common';
import { Genero } from 'src/entities/genero.entity';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class GeneroService {
  private repo = new BaseRepository<Genero>('generos', 'db.json');

  buscarPorId(id?: number): Genero | undefined {
    return this.repo.buscarPorId(id);
  }
}
