import { Injectable } from '@nestjs/common';
import { Pet } from '../entities/pet.entity';
import { BaseRepository } from 'src/repositories/base.repository';
import { PetDetailDTO, PetDTO } from 'src/dtos/pet.dto';
import { Genero } from 'src/entities/genero.entity';

@Injectable()
export class PetService {
  private pet = new BaseRepository<Pet>('pets', 'db.json');
  private genero = new BaseRepository<Genero>('generos', 'db.json');

  listarTodos(): PetDTO[] {
    return this.pet
      .listarTodos()
      .map((pet) => ({
        id: pet.id,
        nome: pet.nome,
        idade: pet.idade,
        fotoBase64: pet.fotoBase64,
        dataCadastro: pet.dataCadastro,
      }))
      .sort((a, b) => {
        const dataA = new Date(a['dataCadastro']).getTime();
        const dataB = new Date(b['dataCadastro']).getTime();

        return dataA - dataB;
      });
  }

  buscarPorId(id: number): PetDetailDTO | undefined {
    const pet = this.pet.buscarPorId(id);
    const genero = this.genero.buscarPorId(pet?.generoId);

    const petDetail: PetDetailDTO = {
      id: pet?.id,
      nome: pet?.nome,
      qualidades: pet?.qualidades,
      historia: pet?.historia,
      cor: pet?.cor,
      raca: pet?.raca,
      idade: pet?.idade,
      fotoBase64: pet?.fotoBase64,
      dataCadastro: pet?.dataCadastro,
      genero: genero?.genero,
    };

    return petDetail;
  }

  listarDestaques(): PetDTO[] {
    return this.listarTodos().slice(0, 3);
  }
}
