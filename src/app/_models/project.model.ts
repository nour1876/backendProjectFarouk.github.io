export class Project {
    title?: string;
    content?: string;
    candidateId?: number;
    image?: File;
    constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}
