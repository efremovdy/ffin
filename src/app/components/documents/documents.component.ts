import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DocumentsService } from '../../services';
import { Document } from '../../models';

@Component({
  templateUrl: 'documents.component.html'
})
export class DocumentsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  documents: Document[] = [];

  constructor(
    private documentsService: DocumentsService
  ) { }

  ngOnInit() {
    this.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getDocuments() {
    this.subscription = this.documentsService.getDocuments()
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
  }
}
