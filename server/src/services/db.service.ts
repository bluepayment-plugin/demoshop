import {Injectable} from '@nestjs/common';

class FakeDbTable {
  private primaryKey = 'id';
  public table: {[key: string]: any}[] = [];

  constructor(primaryKey?: string) {
    if (primaryKey) {
      this.primaryKey = primaryKey;
    }
  }

  save(rowData: {[key: string]: any}): void {
    if (rowData.hasOwnProperty(this.primaryKey)) {
      this.table[rowData[this.primaryKey]] = rowData;
    } else {
      rowData[this.primaryKey] = this.table.length;
      this.table.push(rowData);
    }
  }

  filter(conditions: {[key: string]: any}): {[key: string]: any}[] {
    return this.table.filter(row => {
      let result = true;
      Object.keys(conditions).forEach(key => {
        if (row[key] != conditions[key]) {
          result = false;
        }
      })
      return result;
    });
  }

  find(conditions: {[key: string]: any}): {[key: string]: any} {
    const collection = this.filter(conditions);
    return collection ? collection[0] : null;
  }
}

const availableRepositories: {name: string, table: FakeDbTable}[] = [];

@Injectable()
export class DbService {
  private repositoryName: string;

  setRepository(repositoryName: string): void {
    this.repositoryName = repositoryName;
  }

  save(rowData: {[key: string]: any}) {
    const repository = this.getRepository();
    repository.save(rowData);
  }

  find(conditions: {[key: string]: any}) {
    const repository = this.getRepository();
    return repository.filter(conditions);
  }

  findOne(conditions: {[key: string]: any}) {
    const repository = this.getRepository();
    return repository.find(conditions);
  }

  private getRepository(): FakeDbTable {
    let repository = availableRepositories.find(repository => repository.name === this.repositoryName);
    if (!repository) {
      repository = {
        name: this.repositoryName,
        table: new FakeDbTable()
      };
      availableRepositories.push(repository);
    }
    return repository.table;
  }
}
