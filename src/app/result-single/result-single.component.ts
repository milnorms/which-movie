import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { WatchService } from '../watch.service';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result-single',
  templateUrl: './result-single.component.html',
  styleUrls: ['./result-single.component.scss']
})

export class ResultSingleComponent implements OnInit {
  currentMovie;
  movie = new Movie();
  added: boolean;

  constructor(private data: DataService, private watchService: WatchService, private router: Router) { }

  ngOnInit(): void {
    // Load from imdbID if clicking from the watchlist
    if (this.data.imdbID && history.state.nav) {
      this.data.getCurrentMovie(this.data.imdbID).subscribe(res => {
        this.currentMovie = res;
        console.log(this.currentMovie);
      });

    } else if (history.state.nav){
      // Load from currentmovie if clicking from results page
      this.data.getCurrentMovie(this.data.currentMovie.imdbID).subscribe(res => {
        this.currentMovie = res;
        console.log(this.currentMovie);
      });
    }
    else {
      // If page is reloaded, get imdbID from url and load movies
      this.data.getCurrentMovie(this.urlIdParser(this.router.url)).subscribe(res => {
        this.currentMovie = res;
        console.log(this.currentMovie);
      });
    }

  }

  onAddToWatchList(currentMovie) {
    this.movie.title = this.currentMovie.Title;
    this.movie.watched = false;
    this.movie.poster = this.currentMovie.Poster;
    this.movie.imdbId = this.currentMovie.imdbID;
    this.movie.year = this.currentMovie.Year;
    this.movie.genre = this.currentMovie.Genre;
    this.movie.rating = 0;
    this.movie.review = '';
    console.log(`${this.movie.title} added to database!`);
    this.watchService.addMovie(this.movie);
    this.added = true;
  }

  urlIdParser(url: string) {
    return url.split("/")[2];
  }

}
