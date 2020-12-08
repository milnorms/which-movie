import { Component, OnInit, Input} from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  movies: any;
  search : any;
  termLoadedInit: boolean;
  currentUrl: string;

    // Send a flag to result single state
    movieNav = {
      nav : true
    }

    allMovies: any;



  constructor(private data: DataService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    if (history.state.term) {
      this.search = history.state;
      console.log("state -->", this.search);
    } else {
      this.search = this.urlResultsParser(this.router.url);
      console.log("parser init -->", this.search);

    };

    console.log(this.search.term);
    /////
    this.data.getMovieList(this.search.term).subscribe(data => {
      this.movies = data;
      console.log(this.movies);
    });


    this.currentUrl = this.router.url;
    this.termLoadedInit = true;


  }

  ngDoCheck(): void {
    if (this.search != history.state && !this.termLoadedInit) {
      this.search = history.state;
      console.log("Updated search do check -->", this.search);


      this.data.getMovieList(this.search.term).subscribe(data => {
        this.movies = data;
        console.log(this.movies);
      });

      // Only check for updates if the url changes (search) or the history nav id is 1
    } else if (this.search.navigationID == 1 || this.currentUrl != this.router.url) {
      this.search = this.urlResultsParser(this.router.url);
      console.log("parser do check -->", this.search);

      this.data.getMovieList(this.search.term).subscribe(data => {
        this.movies = data;
        console.log(this.movies);
      });

      this.currentUrl = this.router.url;

    }
  }

  onGoResultSingle(movie) {
    this.data.currentMovie = movie;
    this.router.navigate(['/result-single', this.data.currentMovie.imdbID], { state : this.movieNav});
  }

  urlResultsParser(url: string) {
    let term = url.split("/")[2];
    term = term.replace(/%20/gi, " ");
    return {
      term : term
    };
  }



}
