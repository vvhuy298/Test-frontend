import React, { useEffect, useState } from 'react';
import { Carousel, Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findByUuid } from '../store/movies';

type MovieType = {
  imdbid: string;
  poster: string;
  title: string;
  uuid: string;
  year: string;
  favorited: boolean;
};

const Detail: React.FC = () => {
  const [movie, setMovie] = useState<MovieType>(null);
  const { movieUuid } = useParams();
  const { Text, Title } = Typography;
  const movieData = useSelector((state) => findByUuid(state, movieUuid));

  useEffect(() => {
    document.title = 'Demo - Detail';
    setMovie(movieData);
  }, [movieUuid]);

  return (
    <div style={containner}>
      {movie && (
        <Image.PreviewGroup>
          <Carousel autoplay={false}>
            <div>
              <div style={contentStyle}>
                <Image
                  style={image}
                  key={movie.uuid}
                  src={movie.poster}
                  preview={{ getContainer: '#root' }}
                />
                <Title level={2}>{movie.title}</Title>
                <Text>
                  {movie.year}: {movie.imdbid}
                </Text>
              </div>
            </div>
          </Carousel>
        </Image.PreviewGroup>
      )}
    </div>
  );
};

const containner: React.CSSProperties = {
  paddingTop: 30,
};

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '100%',
  textAlign: 'center',
};

const image: React.CSSProperties = {
  textAlign: 'center',
};

export default Detail;
