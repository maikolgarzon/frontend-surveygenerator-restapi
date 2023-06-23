export class Option {
    id!: number;
    description!: string;
}

export class Question {
    id!: number;
    description!: string;
    options!: Option[];   
}