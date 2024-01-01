import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const CONFIG = environment.contentful_config;

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient = createClient({
    accessToken: import.meta.env['NG_APP_CKEY'],
    space: import.meta.env['NG_APP_CSPACE'],
    environment: import.meta.env['NG_APP_CENV']
  });

  constructor() { }

  getEntry(id:any) {
    const promise = this.cdaClient.getEntry(id);
    return from(promise).pipe(map(entry => entry.fields));
  }

  getEntries(params:any) {
    const promise = this.cdaClient.getEntries(params)
    return from(promise).pipe(map(entries => entries.items));
  }

  getSingleImg(id:string) {
    return this.cdaClient.getAsset(id)
      .then(asset => asset.fields.file?.url);
  }

}
