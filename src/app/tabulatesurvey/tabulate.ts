export class Option{
    count!:number;
    description!:string;
}

export class Question{
    question!:string;
    codeQuestion!:string;
    options!: Option[];   
}