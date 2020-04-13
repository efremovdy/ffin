import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Document } from '../models';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private SERVER_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.SERVER_URL}/documents`, {
      params: { approver: this.authService.currentUserValue.username }
    });
  }

  getDocument(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.SERVER_URL}/documents`, {
      params: { id: id }
    }).pipe(map(documents => {
      return documents[0];
    }));
  }

  upDocument(document: Document): Observable<any> {
    return this.http.put<any>(`${this.SERVER_URL}/documents/${document.id}`, document)
      .pipe(map(() => {
        return 'The document has been successfully verified';
      }));
  }
}
