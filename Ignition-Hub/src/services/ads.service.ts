import { Injectable } from '@angular/core';
import { Ad } from '../interfaces/ad.interface';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private ads: Ad[] = []; // Store ads in an array

  // Method to get all ads
  getAds(): Ad[] {
    return this.ads;
  }

  // Method to add an ad
  addAd(ad: Ad) {
    this.ads.push(ad);
  }

  // Handle file upload and return an array of image URLs
  handleFileUpload(files: FileList): string[] {
    const imageUrls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imageUrls.push(reader.result as string); // Push the image URL to the array
      };
      reader.readAsDataURL(file); // Convert files to base64 URLs
    });
    return imageUrls;
  }

  // Method to update an ad based on its ID
  updateAd(id: number, updatedAd: Ad): boolean {
    const adIndex = this.ads.findIndex((ad) => ad.id === id);
    if (adIndex !== -1) {
      // Update the ad at the specified index
      this.ads[adIndex] = { ...updatedAd, id }; // Preserve the ID while updating the rest
      return true; // Return true if update is successful
    }
    return false; // Return false if ad with the given ID doesn't exist
  }

  // Method to delete an ad based on its ID
  deleteAd(id: number): boolean {
    const adIndex = this.ads.findIndex((ad) => ad.id === id);
    if (adIndex !== -1) {
      this.ads.splice(adIndex, 1); // Remove the ad at the specified index
      return true; // Return true if deletion is successful
    }
    return false; // Return false if ad with the given ID doesn't exist
  }
}
