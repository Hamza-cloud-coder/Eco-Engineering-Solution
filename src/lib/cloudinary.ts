export const CLOUD_NAME = 'dh1tb5hif';

/**
 * Generates an optimized Cloudinary URL.
 * @param publicId The full public ID of the asset on Cloudinary (e.g., 'logo-main')
 * @param isVideo Set to true if the asset is a video.
 */
export const getCloudinaryUrl = (publicId: string, isVideo = false): string => {
  const resourceType = isVideo ? 'video' : 'image';
  // Use the exact publicId provided. If it's in a folder on Cloudinary, include it here (e.g., 'Public/logo-main').
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/q_auto,f_auto/${publicId}`;
};
