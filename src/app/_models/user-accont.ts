import { Role } from "./role";

export class CandidateAccount{
    candidateId?: number;
    username?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    role?: Role;
    status?: boolean;
    phoneNumber?: number;
    address?: string;
    city?: string;
    image?: File;
    constructor(init?: Partial<CandidateAccount>) {
        Object.assign(this, init);
    }
}

export class RecruiterAccount{
    recruiterId?: number;
    companyName?: string;
    usernameRepresentative?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    role?: Role;
    companyActivity?: string;
    companySize?: number;
    activityDomain?: string;
    city?: string;
    address?: string;
    logo?: File;
    constructor(){
    }
}

export class ClubAccount{
    club_id?: number;
    club_name?: string;
    username_representative?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    role?: Role;
    university?: string;
    phone_number?: number;
    club_activity?: string;
    constructor(){
    }
}

export class OwnerAccount{
    owner_id?: number;
    username?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    role?: Role;
    space_name?: string;
    phone_number?: number;
    space_type?: string;
    city?: string;
    constructor(){
    }
}

