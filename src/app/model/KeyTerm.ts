export class KeyTerm {
    id: number;
    name: string;
    description: string;

    constructor(id?: number, name?: string, description?: string) {
        if (id) {
            this.id = id;
        }
        if (name) {
            this.name = name;
        }
        if (description) {
            this.description = description;
        }
    }
}
