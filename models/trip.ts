export default interface Trip {
    id?: number;
    user_id?: number;
    destination_id?: number;
    start_date?: Date;
    end_date?: Date;
    status?: string;
    categories?: number[];
  }
  