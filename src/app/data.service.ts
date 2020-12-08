import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, empty, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_KEY = environment.apiKey;
const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class DataService {

currentMovie : any;
imdbID: any;

  constructor(private http: HttpClient) { }


  getMovieList(searchTerm : string ='', pageNum : string = '', lastPage = 'false') {
    return this.http.get(`${API_URL}${searchTerm}"&page=${pageNum}&apikey=${API_KEY}`);
  }

  getCurrentMovie(movie_id: string) {
    this.currentMovie = null;
    this.imdbID = null;
    return this.http.get(`${API_URL}&apikey=${API_KEY}&i=${movie_id}`);
  }


}
