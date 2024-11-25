import { Theater } from "./theater.model";

export class Seat {
    id?:number;
    location:string;
    reclining:boolean;
    theater_id?:number;
    theather?:Theater;
}
