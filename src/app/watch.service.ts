import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  watchList: AngularFireList<any>;

  constructor( private firebasedb: AngularFireDatabase) { }

  getWatchList(){
    this.watchList = this.firebasedb.list('titles');
    return this.watchList;
  }

  addMovie(movie: Movie) {
    if(!this.watchList){
      this.watchList = this.getWatchList();
    }

    this.watchList.push({
      title : movie.title,
      watched : movie.watched,
      poster : movie.poster,
      imdbId : movie.imdbId,
      year : movie.year,
      genre: movie.genre,
      rating: movie.rating,
      review : movie.review
    });
  }

  toggleMovieWatched($key: string, flag: boolean) {
    this.watchList.update($key, { watched: !flag });
  }

  updateReview($key: string, newReview: string) {
    this.watchList.update($key, { review: newReview });
  }

  updateRating($key: string, newRating: number) {
    this.watchList.update($key, { rating: newRating });
  }

  removeMovie($key: string) {
    this.watchList.remove($key);
  }





}
