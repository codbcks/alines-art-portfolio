export interface Artwork {
  id: number;
  title: string;
  medium: string;
  year: number;
  dimensions: string | null; // optional
  description: string | null; // optional
  imageUrl: string;
  galleryId: number;
  position: number;
}
