import { IKeyValue } from './key-value';
export interface IGalleryItem {
    id: string;
    name: string;
    description: string;
    thumbUrl?: string;
    url: string;
    ratings?: number[];
    tags?: string[];
    menu?: IKeyValue[];
    showHeart?: boolean;
    type: string;
}
