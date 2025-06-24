'use client';

import React, { useState } from 'react';
import { Edit, GripVertical, ImageIcon, Trash2 } from 'lucide-react';
import { Artwork } from '@/types/Artwork';

interface ArtworkListProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onDelete: (artwork: Artwork) => void;
  onReorder: (artworks: Artwork[]) => void;
  reordering: boolean;
}

const ArtworkList: React.FC<ArtworkListProps> = ({
  artworks,
  onEdit,
  onDelete,
  onReorder,
  reordering,
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOver, setDraggedOver] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOver(index);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDraggedOver(null);
      return;
    }

    const newArtworks = [...artworks];
    const draggedArtwork = newArtworks[draggedItem];

    // Remove dragged item
    newArtworks.splice(draggedItem, 1);

    // Insert at new position
    newArtworks.splice(dropIndex, 0, draggedArtwork);

    console.log('Reordered artworks:', newArtworks);

    const updated = newArtworks.map((art, idx) => ({
      ...art,
      position: idx,
    }));

    onReorder(updated);
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  if (artworks.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <ImageIcon className="mx-auto h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No artworks yet</h3>
        <p className="text-gray-500">Add your first artwork to this gallery</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-3">
      {reordering && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
          <div className="text-lg">Updating order...</div>
        </div>
      )}

      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`relative flex items-center gap-4 rounded-lg border p-4 transition-colors ${
            draggedItem === index
              ? 'opacity-50'
              : draggedOver === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          {/* Drag handle */}
          <div
            className="cursor-move p-1 text-gray-400 transition-colors hover:text-gray-600"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
          >
            <GripVertical size={18} />
          </div>

          {/* Artwork thumbnail */}
          {artwork.imageUrl ? (
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="h-16 w-16 rounded object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-gray-400">
              <ImageIcon size={24} />
            </div>
          )}

          {/* Artwork details */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-gray-900">{artwork.title}</h3>
            <p className="truncate text-sm text-gray-500">
              {artwork.medium} {artwork.year ? `(${artwork.year})` : ''}
            </p>
            {artwork.dimensions && (
              <p className="truncate text-sm text-gray-500">{artwork.dimensions}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(artwork)}
              className="rounded p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
              aria-label="Edit artwork"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(artwork)}
              className="rounded p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
              aria-label="Delete artwork"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
