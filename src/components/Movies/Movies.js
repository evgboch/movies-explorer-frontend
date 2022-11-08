import "./Movies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Footer from "../Footer/Footer";

function Movies() {
  return (
    <div className="movies-page">
      <MoviesContainer>
        <Header />
        <SearchForm />
        <MoviesCardList />
      </MoviesContainer>
      {/* <Footer /> */}
    </div>
  )
}

export default Movies;
