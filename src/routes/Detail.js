import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainCss from "../css/MainPage.module.css";
import DetailCss from "../css/Detail.module.css";
import CastMember from "../components/CastMember";

function Detail() {
  const apiKey = process.env.REACT_APP_MOVIE_INFO_KEY;

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id: movieId } = useParams();

  const FormatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      )
    ).json();
    console.log("영화 상세 정보 :", json);
    setMovie(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={MainCss.mainWrapper}>
      {loading ? (
        <h1 className={MainCss.loading}>Loading...</h1>
      ) : (
        <>
          <div className={DetailCss.firstSectionWrapper}>
            <div
              className={DetailCss.blurBackground}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            ></div>
            <div className={DetailCss.content}>
              <section>
                <h1 className={DetailCss.title}>
                  {movie.title}
                  <span className={DetailCss.releaseDate}>
                    ({movie.release_date.split("-")[0]})
                  </span>
                </h1>
                <p className={DetailCss.tagline}>“{movie.tagline}”</p>
                <ul className={DetailCss.genreList}>
                  {movie.genres.map((genre, index) => (
                    <li className={DetailCss.genreItem} key={index}>
                      {genre.name}
                      {index < movie.genres.length - 1 && " • "}
                    </li>
                  ))}
                  <li className={DetailCss.genreItem}>
                    {"  "} • {FormatRuntime(movie.runtime)}
                  </li>
                </ul>
              </section>
            </div>
          </div>
          <div className={DetailCss.SecondSectionWrapper}>
            <img
              className={DetailCss.posterImg}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <section>
              <p className={DetailCss.Summary}>"{movie.overview}"</p>
              <p className={DetailCss.Average}>
                {Math.round(movie.vote_average * 10) / 10} / 10
              </p>
              {/* <p>company</p>
              {movie.production_companies.map((company, index) => (
                <p key={index}>
                  {company.name}
                  {index < company.length - 1 && " / "}
                </p>
              ))} */}
            </section>
            {/*
            평점수 {movie.vote_count}
            개봉상태 {movie.status}
            제작예산 {movie.budget} */}
          </div>
        </>
      )}
      <CastMember movieId={movieId} />
    </div>
  );
}
export default Detail;
