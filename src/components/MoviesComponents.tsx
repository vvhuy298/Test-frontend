/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Row, Spin, notification } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useCallback, useEffect, useState } from 'react';
import { getMovies, favoriteMovie } from '../libs/api';
import { useDispatch, useSelector } from 'react-redux';
import { setToMovies, changeMoviestatus } from '../store/movies';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../store/user';

type MovieType = {
  imdbid: string;
  poster: string;
  title: string;
  uuid: string;
  year: string;
  favorited: boolean;
};

function Movies() {
  const search = useSelector((state) => state.search.search);
  const moviesState = useSelector((state) => state.movies.movies);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [api, contextHolder] = notification.useNotification();
  const filterMoviesByTitle = useCallback((string: string, movies: any) => {
    if (!string) return;
    const searchString = string.toLowerCase();
    const filterData = movies.filter((movie: MovieType) =>
      movie.title.toLowerCase().includes(searchString),
    );
    if (filterData.length > 0) {
      api.success({
        message: 'Search done!',
        description: 'Enjoy your list',
      });
      setMovies(filterData);
    } else {
      api.error({
        message: 'Error search',
        description: 'Have no movies with your search string',
      });
    }
  }, []);

  const getData = useCallback(async () => {
    if (moviesState.length > 0) return;
    const { data } = await getMovies();
    if (data.movies) {
      dispatch(setToMovies(data.movies));
      setMovies(data.movies);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setMovies(moviesState);
  }, [moviesState]);

  useEffect(() => {
    if (search) {
      filterMoviesByTitle(search, moviesState);
    } else {
      setMovies(moviesState);
    }
  }, [search]);

  const handlePushToDetail = (e: any) => {
    navigate(`/movies/${e.uuid}`);
  };

  const handleFavoritedItem = useCallback(async (item: MovieType) => {
    const type = item.favorited ? 'unfavorite' : 'favorite';
    dispatch(changeMoviestatus(item.uuid));
    await favoriteMovie(item.uuid, type);
  }, []);

  if (movies.length === 0) {
    return (
      <div style={loading}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <Row gutter={16}>
        {movies.map((item: MovieType, index) => (
          <Col span={6} style={style} key={index} xs={24} xl={6}>
            <Card
              hoverable
              style={card}
              cover={
                <div
                  onClick={() => handlePushToDetail(item)}
                  style={{
                    ...cardCover,
                    ...{ backgroundImage: `url(${item.poster})` },
                  }}
                ></div>
              }
            >
              <div style={favoriteButtton}>
                <Button
                  disabled={user ? false : true}
                  style={{ backgroundColor: 'white' }}
                  onClick={() => handleFavoritedItem(item)}
                  icon={
                    <BookOutlined
                      style={{
                        color: item.favorited ? 'orange' : '',
                      }}
                    />
                  }
                />
              </div>
              <Meta
                title={item.title}
                description={`${item.imdbid} / ${item.year}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
const style: React.CSSProperties = {
  padding: '8px',
  display: 'flex',
};

const loading: React.CSSProperties = {
  margin: '20px 0',
  textAlign: 'center',
};

const card: React.CSSProperties = {
  width: '100%',
  height: 300,
};

const cardCover: React.CSSProperties = {
  width: '100%',
  height: 200,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '8px 8px 0 0',
};

const favoriteButtton: React.CSSProperties = {
  flex: '1',
  top: '0',
  right: '0',
  textAlign: 'center',
  position: 'absolute',
  flexDirection: 'column',
};

export default Movies;
