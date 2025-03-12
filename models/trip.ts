export default interface Trip{
    id:number;
    user_id:number | null;
    destination_id:number | null;
    start_date:Date | null;
    end_date:Date | null;
    status:string | null;
}