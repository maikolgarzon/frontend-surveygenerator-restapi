export class UserResponse{
    respondentName!:string;
    codeOption!:string[];
    email!:string;
}

export class Option {
    id!: number;
    description!: string;
    codeOption!: string;
    selectedOption!:string;
}

export class Question {
    id!: number;
    description!: string;
    selectedOption!:String;
    options!: Option[];   
} 

export class Survey{
    title!:string;
    description!:string;
    questions!: Question[];
} 