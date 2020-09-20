import React from 'react';
import Movie from "../components/Movie"
import "./Home.css"
import axios from "axios"

class  Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  // componentDidMount(){ //컴포넌트가 첫 렌더링한 후
  //   console.log("componentDidMount")
  // }
  // componentDidUpdate(){ //리렌더링후
  //   console.log("componentDidUpdate")
  // }
  // componentWillUnmount(){ //컴포넌트가 제거 되기 직전
  //   console.log("componentWillUnmount")
  // }
  loadMovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating") //비동기 함수 await가 끝날때가 까지 기달려
    console.log(movies)
    this.setState({ movies, isLoading: false })
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadMovies();
    },1000); //1초 로딩
    
  }
  render() {
    console.log("render")
    const { isLoading, movies } = this.state;
    return (
      <section className="container">{isLoading ? (
        // <body style={{background:"black"}}>  
        <div className="loader">
          <div id="load">
            <div>G</div>
            <div>N</div>
            <div>I</div>
            <div>D</div>
            <div>A</div>
            <div>O</div>
            <div>L</div>
          </div>
        </div>
        // </body>
      ) : (
          <div className="movies">
            {movies.map(movies => {
              console.log(movies)
              return <Movie key={movies.id}
                id={movies.id}
                year={movies.year}
                title={movies.title}
                summary={movies.summary}
                poster={movies.medium_cover_image}
                genres={movies.genres} />
            })}
          </div>
        )}
      </section>
    )
  }
}

export default  Home;
