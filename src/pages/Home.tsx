import React, { useEffect } from 'react';
import '../App.css';
import Movies from '../components/MoviesComponents';

const Detail: React.FC = () => {
  useEffect(() => {
    document.title = 'Demo - Home';
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
