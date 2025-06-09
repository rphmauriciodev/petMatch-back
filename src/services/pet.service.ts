import { Injectable } from '@nestjs/common';
import { Pet } from '../entities/pet.entity';
import { BaseRepository } from 'src/repositories/base.repository';
import { PetDetailDTO, PetDTO } from 'src/dtos/pet.dto';
import { Genero } from 'src/entities/genero.entity';
import { GeneroService } from './genero.service';
import { UserService } from './user.service';

@Injectable()
export class PetService {
  constructor(
    readonly generoService: GeneroService,
    readonly userService: UserService,
  ) {}
  private repo = new BaseRepository<Pet>('pets', 'db.json');

  listarTodos(): PetDTO[] {
    return this.repo
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
    const pet = this.repo.buscarPorId(id);
    const genero = this.generoService.buscarPorId(pet?.generoId);

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

  adotarPet(petId: number, userId: number) {
    let user = this.userService.buscarPorId(userId);

    if (user) {
      user.hasAdoption = true;

      this.userService.atualizar(user);
      this.repo.removerPorId(petId);
      return true;
    }

    return false;
  }

  listarDestaques(): PetDTO[] {
    return this.listarTodos().slice(0, 3);
  }
}
