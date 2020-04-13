import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { DocumentsService, AlertService } from '../../services';
import { Document } from '../../models';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  loading = false;
  document: Document;
  docForm: FormGroup;
  resolutions = [
    { value: 'approved', title: 'Согласен' },
    { value: 'completelyApproved', title: 'Полностью согласен' },
    { value: 'rejected', title: 'Не согласен' },
    { value: 'customValue', title: 'Разрешаю красить в синий цвет' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private documentsService: DocumentsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getDocument();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public accept() {
    const doc: Document = Object.assign(this.document, this.docForm.value, { state: 1 });
    this.sendRequest(doc);
  }

  public decline() {
    const doc: Document = Object.assign(this.document, this.docForm.value, { state: 0 });
    this.sendRequest(doc);
  }

  private sendRequest(document: Document) {
    this.loading = true;
    this.subscription = this.documentsService.upDocument(document).pipe(first())
      .subscribe(
        data => {
          this.document = null;
          this.alertService.success(data);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private buildForm() {
    this.docForm = this.formBuilder.group({
      header: [this.document.header, []],
      content: [this.document.content, []],
      resolution: [this.resolutions[0].value, []],
      comment: [this.document.comment, []],
    });
  }

  private getDocument() {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.documentsService.getDocument(id)
      .pipe(catchError(error => {
        this.router.navigate(['/']);
        return error;
      }))
      .subscribe((document: Document) => {
        if (!document) {
          this.router.navigate(['/']);
        }
        this.document = document;
        this.buildForm();
      });
  }
}
