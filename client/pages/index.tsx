import { Box, Button, Container, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

export const Index = () => {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js
        </Typography>
        <Link href='/about'>
          <Button name="" variant='contained' color='primary'>
            Entra al about
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Index;
