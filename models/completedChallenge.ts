import { Challenge } from "./challenge"
import User from "./user"


export interface CompletedChallenge {
    id?: number;
    user?: User;
    challenge?: Challenge;
    completed_at?: Date;
    proof_photo_url?: string;
    description?: string;
}
