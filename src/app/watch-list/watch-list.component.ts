import { Component, OnInit } from '@angular/core';
import { WatchService } from '../watch.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
  providers : [WatchService]
})
export class WatchListComponent implements OnInit {
  // Global array to contain database collection of all movies in list
  watchListArray: any[];
  // Global array to contain watched movies
  watched: any[];
  // Global array to contain unwatched movies
  unwatched: any[];

  mouseOveredOne: boolean;
  mouseOveredTwo: boolean;
  mouseOveredThree: boolean;
  mouseOveredFour: boolean;
  mouseOveredFive: boolean;

  // Send a flag to result single
  movieNav = {
    nav : true
  }



  constructor(private watchService: WatchService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.watchService.getWatchList().snapshotChanges()
    .subscribe(item => {

      this.watchListArray = [];
      this.watched = [];
      this.unwatched = [];

      let i = 0;
      item.forEach(element => {
        let movie = element.payload.toJSON();
        movie['$key'] = element.key;
        // Collection element pushed into global array
        this.watchListArray.push(movie);


        // Sorts through watched and unwatched movies and places into arr
        if (this.watchListArray[i].watched) {
          this.watched.push(this.watchListArray[i]);
        } else {
          this.unwatched.push(this.watchListArray[i]);
        }
        i++;
      });

      // Reverse array to have recently added elements first
      this.watched.reverse();
      this.unwatched.reverse();


    });



  }

  onClickRemoveMovie($key: string) {
    this.watchService.removeMovie($key);
  }

  onRemoveAllMovies(watchListArray) {
    for (let i = 0; i < watchListArray.length; i++) {
      this.watchService.removeMovie(watchListArray[i].$key);
    }
  }

  onClickWatch($key: string, flag: boolean) {
    this.watchService.toggleMovieWatched($key, flag);
  }


  onClickSetRating($key: string, rating: number) {
    this.watchService.updateRating($key, rating);
  }

  onClickGoToMovie(imdbId: string) {
    this.data.imdbID = imdbId;
    this.router.navigate(['/result-single', this.data.imdbID], { state : this.movieNav});
  }




}


