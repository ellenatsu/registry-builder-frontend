export interface User {
    id: string;
    sub: string;
    name: string | null;
    email: string | null;
    picture: string | null;
    preferredCategory: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
    name_updated: boolean;
    email_updated: boolean;
    picture_updated: boolean;
}

export interface PublicUserData {
    name: string | null;
    picture: string | null;
}