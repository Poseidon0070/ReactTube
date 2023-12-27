import React, { useEffect, useState } from 'react';
import {LinearProgress } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from './Videos';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {searchTerm} = useParams()

  useEffect(() => {
    setIsLoading(true);

    fetchData(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, [searchTerm]);

  return (
    <>
      {isLoading && <LinearProgress color="primary" />}
      {!isLoading && (
        <div>
        <Videos videos={videos}  isChannel={false} />
        </div>
      )}
    </>
  );
};

export default SearchFeed;
