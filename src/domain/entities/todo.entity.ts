export class TodoEntity {
  constructor(public readonly id: number, public text: string, public completedAt?: Date | null) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object;
    if (!id) throw 'Id is required';
    if (!text) throw 'Text is required';

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw 'ComopletedAt is not a valid Date';
      }
    }

    return new TodoEntity(id, text, completedAt);
  }
}
