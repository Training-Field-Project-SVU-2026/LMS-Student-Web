import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-profile',
  imports: [],
  templateUrl: './side-bar-profile.html',
  styleUrl: './side-bar-profile.css',
})
export class SideBarProfile {

   navItems: NavItem[] = [
    { label: 'Profile',             route: '/profile',       icon: 'person' },
    { label: 'Notifications',       route: '/notifications', icon: 'notifications' },
    { label: 'Security & Password', route: '/security',      icon: 'shield' },
    { label: 'Preferences',         route: '/preferences',   icon: 'settings' },
  ];
}
