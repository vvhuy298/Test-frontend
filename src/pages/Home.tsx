import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../App.css';
import Movies from '../components/MoviesComponents';
import { setSearch } from '../store/search';
import { useDispatch } from 'react-redux';

const Detail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get('search');
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Demo - Home';
    if (param) {
      dispatch(setSearch(param));
    }
  }, []);
  return (
    <div style={containner}>
      <Movies />
    </div>
  );
};

const containner: React.CSSProperties = {
  paddingTop: 30,
};

export default Detail;
