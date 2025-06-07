import { Injectable } from '@nestjs/common';
import { Pet } from '../entities/pet.entity';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class PetService {
  private repo = new BaseRepository<Pet>('pets', 'db.json');

  listarTodos(): Pet[] {
    return this.repo.listarTodos().sort((a, b) => {
      const dataA = new Date(a['dataCadastro']).getTime();
      const dataB = new Date(b['dataCadastro']).getTime();

      return dataA - dataB;
    });
  }

  buscarPorId(id: number): Pet | undefined {
    return this.repo.buscarPorId(id);
  }

  listarDestaques(): Pet[] {
    return this.listarTodos().slice(0, 3);
  }
}
