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

  private salvarDB(db: Record<string, T[]>): void {
    fs.writeFileSync(this.dbPath, JSON.stringify(db, null, 2), 'utf8');
  }

  listarTodos(): T[] {
    const db = this.lerDB();
    const collection = db[this.collectionName] || [];
    return collection;
  }

  buscarPorId(id?: number): T | undefined {
    if (id !== undefined) {
      const db = this.lerDB();
      const collection = db[this.collectionName] || [];
      return collection.find((item) => item.id == id);
    }
    return undefined;
  }

  removerPorId(id: number): boolean {
    const db = this.lerDB();
    const collection = db[this.collectionName] || [];
    const index = collection.findIndex((item) => item.id === id);
    if (index === -1) return false;

    collection.splice(index, 1);
    db[this.collectionName] = collection;
    this.salvarDB(db);

    return true;
  }

  atualizar(itemAtualizado: T): boolean {
    const db = this.lerDB();
    const collection = db[this.collectionName] || [];
    const index = collection.findIndex((item) => item.id === itemAtualizado.id);
    if (index === -1) return false;

    collection[index] = itemAtualizado;
    db[this.collectionName] = collection;
    this.salvarDB(db);

    return true;
  }
}
