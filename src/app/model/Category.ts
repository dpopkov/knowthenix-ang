export class Category {

    constructor(public id?: number, public name?: string, public description?: string) {
    }

    static fromHttp(obj: Category): Category {
        return new Category(obj.id, obj.name, obj.description);
    }
}
