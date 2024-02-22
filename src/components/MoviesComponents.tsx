/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Divider, List, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useCallback, useEffect, useState } from 'react';
import { getMovies, favoriteMovie } from '../libs/api';
import { useDispatch, useSelector } from 'react-redux';
import { changeMoviestatus, addToMovies, clearToMovies } from '../store/movies';
import { BookOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectUser } from '../store/user';
import InfiniteScroll from 'react-infinite-scroll-component';

type MovieType = {
  imdbid: string;
  poster: string;
  title: string;
  uuid: string;
  year: string;
  favorited: boolean;
};

type MetaType = {
  current_page: number;
  from: number;
  last_page: number;
  to: number;
  total: number;
};

function Movies() {
  const moviesState = useSelector((state) => state.movies.movies);
  const [movies, setMovies] = useState([]);
  const [meta, setMeta] = useState<MetaType>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [searchParams] = useSearchParams();
  const param = searchParams.get('search');

  const handlePushToDetail = (e: any) => {
    navigate(`/movies/${e.uuid}`);
  };

  const handleFavoritedItem = useCallback(async (item: MovieType) => {
    const type = item.favorited ? 'unfavorite' : 'favorite';
    dispatch(changeMoviestatus(item.uuid));
    await favoriteMovie(item.uuid, type);
  }, []);

  useEffect(() => {
    setMovies(moviesState);
  }, [moviesState]);

  const [loading, setLoading] = useState(false);

  const loadMoreData = useCallback(
    async (mode?: string) => {
      if (loading) {
        return;
      }
      setLoading(true);
      const payload = {
        search: param,
        offset: mode != 'refresh' && meta?.to ? meta?.to : 0,
        limit: 10,
      };
      const { data } = await getMovies(payload);
      if (data.movies) {
        dispatch(addToMovies(data.movies));
        setMovies([...movies, ...data.movies]);
      }
      setMeta(data.meta);
      setLoading(false);
    },
    [meta, movies, param],
  );

  useEffect(() => {
    dispatch(clearToMovies());
    setMeta([]);
    loadMoreData('refresh');
  }, [param, setMeta]);

  useEffect(() => {
    if (param && meta?.current_page < meta?.last_page && movies.length < 10) {
      loadMoreData();
    }
  }, [meta, movies]);

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 'calc(100vh - 100px)',
          overflowY: 'scroll',
          padding: '0 16px',
        }}
      >
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreData}
          hasMore={meta.current_page < meta.last_page}
          height={'calc(100vh - 110px)'}
          style={{
            overflowX: 'hidden',
          }}
          loader={
            <div style={{ paddingTop: '40px' }}>
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          }
          endMessage={<Divider plain>It is all, nothing more!</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={movies}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 4,
              xxl: 4,
            }}
            renderItem={(item: MovieType) => (
              <div style={{ padding: 8 }}>
                <Card
                  hoverable
                  style={card}
                  cover={
                    <div
                      onClick={() => handlePushToDetail(item)}
                      style={{
                        ...cardCover,
                        ...{
                          backgroundImage: `url(${item.poster})`,
                        },
                      }}
                    ></div>
                  }
                >
                  <div style={favoriteButtton}>
                    <Button
                      disabled={user ? false : true}
                      onClick={() => handleFavoritedItem(item)}
                      style={{ backgroundColor: 'white' }}
                      icon={
                        <BookOutlined
                          style={{
                            color: user && item.favorited ? 'orange' : '',
                          }}
                        />
                      }
                    />
                  </div>
                  <Meta
                    title={item.title}
                    description={`${item.year} / ${item.imdbid}`}
                  />
                </Card>
              </div>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
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
