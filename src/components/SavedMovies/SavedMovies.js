import "./SavedMovies.css";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <div className="saved-movies-page">
      <MoviesContainer>
        <Header />
        <SearchForm />
        <MoviesCardList />
      </MoviesContainer>
      <Footer />
    </div>
  )
}

export default SavedMovies;
