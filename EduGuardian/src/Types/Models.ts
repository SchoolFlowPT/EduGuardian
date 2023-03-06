export interface InitialConfig {
    images: string[];
    entity: EntityData;
    appVersion: string;
    oauthName: string;
}

interface EntityData {
    name: string;
    smallName: string;
}