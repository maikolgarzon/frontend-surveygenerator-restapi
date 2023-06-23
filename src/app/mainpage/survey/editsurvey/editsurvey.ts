export class Option {
    id: number;
    description: string;
    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
      }
}

export class Question {
    id!: number;
    description!: string;
    options!: Option[];   
} 

export class EditSurvey{
    title!:string;
    description!:string;
    questions!: Question[];
} 