export class KeyTerm {

    constructor(public id?: number, public name?: string, public description?: string) {
    }

    static fromHttp(obj: KeyTerm ): KeyTerm {
        return new KeyTerm(obj.id, obj.name, obj.description);
    }
}
