import homeCss from "../css/Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
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
      }, 500); // fade-out 시간
    }, 6000); // 이미지 전환 주기

    return () => clearInterval(interval); //언마운트 될때 inerval 중지
  }, [movies]);

  return (
    <div className={homeCss.wrapper}>
      {loading ? (
        <h1 className={homeCss.loading}>Loading...</h1>
      ) : (
        <>
          <div className={homeCss.topSection}>
            <div className={homeCss.leftText}>
              <h2>🎬 추천 영화</h2>
              <p>최고 평점을 받은 영화들을 지금 확인해보세요!</p>
            </div>
            <div className={homeCss.rightSlider}>
              <img
                src={movies[currentSlide]?.background_image_original}
                alt="slide"
                className={`${homeCss.sliderImage} ${
                  fade ? homeCss.fadeIn : homeCss.fadeOut
                }`}
              />
            </div>
          </div>

          <div className={homeCss.moviesImgGrid}>
            {movies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <img src={movie.medium_cover_image} alt="movieImg" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
