'use client';

import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Artwork } from '@/types/Artwork';

interface ArtworkFormProps {
  artwork?: Artwork | null;
  onSubmit: (artwork: Partial<Artwork>) => void;
  onClose: () => void;
}

const ArtworkForm: React.FC<ArtworkFormProps> = ({ artwork, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [customMedium, setCustomMedium] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [dimensions, setDimensions] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.title);
      const mediumValue = artwork.medium;
      const predefinedMediums = [
        'Oil on Canvas',
        'Acrylic on Canvas',
        'Watercolor',
        'Digital Print',
        'Charcoal Drawing',
        'Pencil Drawing',
        'Mixed Media',
        'Photography',
        'Sculpture',
        'Installation',
        'Video Art',
        'Performance',
      ];

      if (predefinedMediums.includes(mediumValue)) {
        setMedium(mediumValue);
        setCustomMedium('');
      } else {
        setMedium('Other');
        setCustomMedium(mediumValue);
      }

      setYear(artwork.year);
      setDimensions(artwork.dimensions || '');
      setDescription(artwork.description || '');
      setImageUrl(artwork.imageUrl);
    } else {
      setTitle('');
      setMedium('');
      setCustomMedium('');
      setYear(new Date().getFullYear());
      setDimensions('');
      setDescription('');
      setImageUrl('');
    }
  }, [artwork]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalMedium = medium === 'Other' ? customMedium.trim() : medium.trim();
    if (!title.trim() || !finalMedium || !imageUrl.trim()) return;

    setLoading(true);
    try {
      onSubmit({
        title: title.trim(),
        medium: finalMedium,
        year,
        dimensions: dimensions.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    // Safely extract secure_url from the result
    if (typeof result.info === 'object' && result.info !== null) {
      const info = result.info as Record<string, unknown>;
      if (typeof info.secure_url === 'string') {
        setImageUrl(info.secure_url);
      }
    }
  };

  const handleMediumChange = (value: string) => {
    setMedium(value);
    if (value !== 'Other') {
      setCustomMedium('');
    }
  };

  const mediumOptions = [
    'Oil on Canvas',
    'Acrylic on Canvas',
    'Watercolor',
    'Digital Print',
    'Charcoal Drawing',
    'Pencil Drawing',
    'Mixed Media',
    'Photography',
    'Sculpture',
    'Installation',
    'Video Art',
    'Performance',
    'Other',
  ];

  const isFormValid = () => {
    const finalMedium = medium === 'Other' ? customMedium.trim() : medium.trim();
    return title.trim() && finalMedium && imageUrl.trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{artwork ? 'Edit Artwork' : 'Add New Artwork'}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Artwork Image *</label>

            {imageUrl ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Artwork preview"
                  width={500}
                  height={300}
                  className="h-48 w-full rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white transition-colors hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <CldUploadWidget
                signatureEndpoint="/api/sign-image"
                onSuccess={handleUploadSuccess}
                options={{
                  sources: ['local'],
                  multiple: false,
                  maxFiles: 1,
                  styles: {
                    palette: {
                      window: '#FFFFFF',
                      windowBorder: '#90A0B3',
                      tabIcon: '#0078FF',
                      menuIcons: '#5A616A',
                      textDark: '#000000',
                      textLight: '#FFFFFF',
                      link: '#0078FF',
                      action: '#FF620C',
                      inactiveTabIcon: '#0E2F5A',
                      error: '#F44235',
                      inProgress: '#0078FF',
                      complete: '#20B832',
                      sourceBg: '#E4EBF1',
                    },
                  },
                }}
              >
                {({ open }) => (
                  <div
                    onClick={() => open()}
                    className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-blue-400 hover:bg-blue-50"
                  >
                    <Upload size={48} className="mb-2 text-gray-400" />
                    <p className="text-center text-gray-600">Click to upload artwork image</p>
                    <p className="mt-1 text-sm text-gray-500">Supports: JPG, PNG, WebP</p>
                  </div>
                )}
              </CldUploadWidget>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter artwork title"
                required
              />
            </div>

            {/* Medium */}
            <div className={medium === 'Other' ? 'md:col-span-2' : ''}>
              <label htmlFor="medium" className="mb-1 block text-sm font-medium text-gray-700">
                Medium *
              </label>
              <select
                id="medium"
                value={medium}
                onChange={(e) => handleMediumChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select medium</option>
                {mediumOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Medium Input - Only shown when "Other" is selected */}
            {medium === 'Other' && (
              <div className="md:col-span-2">
                <label
                  htmlFor="customMedium"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Custom Medium *
                </label>
                <input
                  type="text"
                  id="customMedium"
                  value={customMedium}
                  onChange={(e) => setCustomMedium(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter custom medium (e.g., Pastel on Paper, Ink Wash, etc.)"
                  required
                />
              </div>
            )}

            {/* Year */}
            <div className={medium === 'Other' ? 'md:col-span-2' : ''}>
              <label htmlFor="year" className="mb-1 block text-sm font-medium text-gray-700">
                Year *
              </label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Dimensions */}
            <div className="md:col-span-2">
              <label htmlFor="dimensions" className="mb-1 block text-sm font-medium text-gray-700">
                Dimensions
              </label>
              <input
                type="text"
                id="dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 100x80 cm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter artwork description"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:bg-green-300"
            >
              {loading ? 'Saving...' : artwork ? 'Update' : 'Add Artwork'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkForm;
