import { Category } from "./category";

export class Survey{
    id!:number;
    title!:string;
    codeSurvey!:string;
    category!:Category;
    description!:string;
    createAt!:string;
    questions!:{ id: number, description: string }[];
}