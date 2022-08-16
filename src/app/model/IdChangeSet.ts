export class IdChangeSet {
  constructor(public add: Array<number> = new Array<number>(),
              public remove: Array<number> = new Array<number>()) {
  }

  addIdToAdd(id: number) {
    this.add.push(id);
  }

  addIdToRemove(id: number) {
    this.remove.push(id);
  }
}
