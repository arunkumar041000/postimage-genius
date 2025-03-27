/**
 * Converts a File object to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Extract the base64 part by removing the data URL prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Resizes an image to ensure it's under the size limit for API requests
 * Returns a base64 string of the resized image
 */
export const resizeImageIfNeeded = async (
  file: File, 
  maxWidth = 1024, 
  maxHeight = 1024,
  maxSizeInBytes = 4 * 1024 * 1024 // 4MB
): Promise<string> => {
  // If file is already small enough, convert directly to base64
  if (file.size <= maxSizeInBytes) {
    return await fileToBase64(file);
  }
  
  // Otherwise, resize the image
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      // Calculate new dimensions maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // Create canvas and draw resized image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to base64 with reduced quality if it's a JPEG
      let quality = 0.9;
      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      
      // Try to get a file under the size limit
      const getBase64WithQuality = (q: number) => {
        const dataUrl = canvas.toDataURL(mimeType, q);
        const base64 = dataUrl.split(',')[1];
        
        // Estimate size (rough approximation)
        const estimatedSize = Math.ceil((base64.length * 3) / 4);
        
        return { base64, estimatedSize };
      };
      
      let result = getBase64WithQuality(quality);
      
      // If still too large, reduce quality gradually
      while (result.estimatedSize > maxSizeInBytes && quality > 0.5) {
        quality -= 0.1;
        result = getBase64WithQuality(quality);
      }
      
      // Clean up
      URL.revokeObjectURL(img.src);
      
      resolve(result.base64);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};
