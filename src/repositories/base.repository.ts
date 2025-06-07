// src/repositories/generic.repository.ts
import * as fs from 'fs';
import * as path from 'path';

export interface BaseEntity {
  id: number;
}

export class BaseRepository<T extends BaseEntity> {
  private dbPath: string;
  private collectionName: string;

  constructor(collectionName: string, dbFilePath?: string) {
    this.collectionName = collectionName;
    this.dbPath =
      dbFilePath || path.join(__dirname, '..', '..', 'database.json');
  }

  private lerDB(): Record<string, T[]> {
    const dados = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(dados);
  }

  listarTodos(): T[] {
    const db = this.lerDB();
    const collection = db[this.collectionName] || [];
    return collection;
  }

  buscarPorId(id: number): T | undefined {
    const db = this.lerDB();
    const collection = db[this.collectionName] || [];
    return collection.find((item) => item.id === id);
  }
}
