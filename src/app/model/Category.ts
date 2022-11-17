export class Category {

    constructor(public id?: number, public name?: string, public description?: string, public createdBy?: string) {
    }

    static fromHttp(obj: Category): Category {
        return new Category(obj.id, obj.name, obj.description, obj.createdBy);
    }
}
