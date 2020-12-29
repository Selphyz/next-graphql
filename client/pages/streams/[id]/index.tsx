import React from 'react';
import Container from '@material-ui/core/Container';
import { Content, Hero } from '../../../components';
import { useStreamQuery, Stream } from '../../../generated/graphql';
const StreamDetail = ({ id }) => {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });
  if (!loading && data && data.stream) {
    return (
      <Container maxWidth='lg'>
        <Hero stream={data.stream as Stream} />
        <Content url={data.stream.url} />
      </Container>
    );
  }
  return null;
};
StreamDetail.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default StreamDetail;
