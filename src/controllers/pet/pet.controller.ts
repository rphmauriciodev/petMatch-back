import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PetService } from 'src/services/pet.service';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getAllPets() {
    return this.petService.listarTodos();
  }

  @Get('destaques')
  getDestaques() {
    return this.petService.listarDestaques();
  }

  @Get(':id')
  getPetById(@Param('id') id: number) {
    return this.petService.buscarPorId(id);
  }

  @Post('adotar')
  adotarPet(@Body() body: { petId: number; userId: number }): {
    message: string;
  } {
    const { petId, userId } = body;

    const sucesso = this.petService.adotarPet(petId, userId);

    if (!sucesso) {
      throw new BadRequestException('Não foi possível realizar a adoção.');
    }

    return { message: 'Adoção realizada com sucesso!' };
  }
}
