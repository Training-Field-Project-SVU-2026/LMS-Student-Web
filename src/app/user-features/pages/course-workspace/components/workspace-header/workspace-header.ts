import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ICourseWorkspaceHeader } from '../../../../models/courseWorkspace.model';
@Component({
  selector: 'app-workspace-header',
  imports: [CommonModule],
  templateUrl: './workspace-header.html',
  styleUrl: './workspace-header.css',
})
export class WorkspaceHeader {
  @Input({ required: true }) course!: ICourseWorkspaceHeader;

}
