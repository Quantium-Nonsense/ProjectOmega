import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OmegaSys';
  customers$: Observable<any> = this.http.get('/api/customers');
​
  constructor(private http: HttpClient) {}
}
