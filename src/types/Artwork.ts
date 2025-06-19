export interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: number;
  dimensions?: string; // optional
  description?: string; // optional
  imageUrl: string;
  galleryId: number;
  position: number;
}
