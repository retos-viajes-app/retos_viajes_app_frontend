export default interface Trip {
    id?: number;
    user_id?: number;
    destination_id?: number;
    start_date?: Date;
    end_date?: Date;
    status?: string;
    categories?: number[];
    participants_ids?: number[];
    destination_name?: string;
    destination_image_url?: string;
    completed_challenges_count?: number;
    extra_participants?: number;
    is_ongoing?: boolean;
  }