import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { PetController } from './controllers/pet/pet.controller';
import { PetService } from './services/pet.service';
import { GeneroService } from './services/genero.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PetController, UserController],
  providers: [AppService, PetService, GeneroService, UserService],
})
export class AppModule {}
