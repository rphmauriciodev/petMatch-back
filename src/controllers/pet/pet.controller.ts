import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
