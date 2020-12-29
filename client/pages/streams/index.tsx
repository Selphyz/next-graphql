import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { Post } from '../../components';
import { useStreamsQuery, Stream } from '../../generated/graphql';
const Streams = () => {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: 'ignore' });
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h4'>Streams</Typography>
      </Box>
      {!loading && data && data.streams && <Post streams={data.streams as Stream[]} />}
    </Container>
  );
};

export default Streams;
