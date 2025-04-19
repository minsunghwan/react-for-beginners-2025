import MainCss from "../css/MainPage.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Mainpage() {
  const apiKey = process.env.REACT_APP_MOVIE_INFO_KEY;

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  const getMovies = async () => {
    let allMovies = [];

    for (let page = 1; page <= 2; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
      );
      const json = await response.json();
      allMovies = [...allMovies, ...json.results];
    }

    setMovies(allMovies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies]);

  const handleImageLoad = () => {
    setFade(true); // 이미지 로딩 완료 후 fadeIn 상태로 전환
  };

  return (
    <div className={MainCss.mainWrapper}>
      {loading ? (
        <h1 className={MainCss.loading}>Loading...</h1>
      ) : (
        <>
          <div className={MainCss.heroSection}>
            <div className={MainCss.heroText}>
              <img src="/img/ImgLogo.png" className={MainCss.logoImage} />
              <h2>이 모든 이야기가 여기에</h2>
              <p>최고 평점을 받은 영화들을 지금 확인해보세요!</p>
            </div>
            <div className={MainCss.heroSlider}>
              <img
                src={`https://image.tmdb.org/t/p/original${movies[currentSlide]?.backdrop_path}`}
                alt={movies[currentSlide]?.title || "슬라이더"}
                className={`${MainCss.sliderImage} ${
                  fade ? MainCss.fadeIn : MainCss.fadeOut
                }`}
                onLoad={handleImageLoad} // 이미지가 로드된 후 fadeIn 적용
              />
            </div>
          </div>

          <div className={MainCss.movieGrid}>
            {movies.map((movie, index) => (
              <Link to={`/movies/${movie.id}`} key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Mainpage;
