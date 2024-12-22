import { Component, inject } from '@angular/core';
import { AdsService } from '../../services/ads.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as admins from '../../assets/admin.json';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminComponent {
  adsService = inject(AdsService);

  username: string = '';
  password: string = '';
  isAdmin = false;
  ads = this.adsService.getAds();
  adminList: { username: string; password: string }[] = (admins as any).default;
  showAddDialog = false;
  showUpdateDialog = false;
  currentAd: any = { id: null, title: '', description: '', pictures: [] };

  login() {
    const isValidAdmin = this.adminList.some(
      (admin) =>
        admin.username === this.username && admin.password === this.password
    );

    if (isValidAdmin) {
      this.isAdmin = true;
    } else {
      alert('Incorrect username or password!');
    }
  }

  logout() {
    this.isAdmin = false;
    this.username = '';
    this.password = '';
  }

  openAddDialog() {
    this.currentAd = { id: null, title: '', description: '', pictures: [] };
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }

  openUpdateDialog(ad: any) {
    this.currentAd = { ...ad }; // Pre-fill the dialog with selected ad data
    this.showUpdateDialog = true;
  }

  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }

  addAd() {
    if (
      this.currentAd.title.trim() &&
      this.currentAd.description.trim() &&
      this.currentAd.pictures.length
    ) {
      const adsArray = this.adsService.getAds();
      const newAd = {
        id: adsArray.length > 0 ? adsArray[adsArray.length - 1].id + 1 : 1,
        title: this.currentAd.title.trim(),
        description: this.currentAd.description.trim(),
        pictures: this.currentAd.pictures,
      };
      this.adsService.addAd(newAd);
      this.closeAddDialog();
      alert('Ad added successfully!');
    } else {
      alert('Please provide a title, description, and at least one image.');
    }
  }

  updateAd() {
    if (
      this.currentAd.title.trim() &&
      this.currentAd.description.trim() &&
      this.currentAd.pictures.length
    ) {
      const adsArray = this.adsService.getAds();
      const adIndex = adsArray.findIndex((ad) => ad.id === this.currentAd.id);
      if (adIndex > -1) {
        adsArray[adIndex] = { ...this.currentAd }; // Update the ad at the specified index
        alert('Ad updated successfully!');
        this.closeUpdateDialog();
      }
    } else {
      alert('Please provide a title, description, and at least one image.');
    }
  }

  deleteAd(adId: number) {
    const adsArray = this.adsService.getAds();
    const adIndex = adsArray.findIndex((ad) => ad.id === adId);
    if (adIndex > -1) {
      adsArray.splice(adIndex, 1); // Delete the ad at the specified index
      alert('Ad deleted successfully!');
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      this.currentAd.pictures = this.adsService.handleFileUpload(files); // Process files and store image URLs
    }
  }
}
