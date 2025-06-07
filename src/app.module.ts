import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { PetController } from './controllers/pet/pet.controller';
import { PetService } from './services/pet.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PetController],
  providers: [AppService, PetService],
})
export class AppModule {}
