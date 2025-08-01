import type { ReactNode } from 'react';

export interface Service {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
}

export interface NewsItem {
    date: string;
    title: string;
}

export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
    url: string;
}