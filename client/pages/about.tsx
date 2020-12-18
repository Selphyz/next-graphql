import { Container, Box, Typography, Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

export const About = () => {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom>
          Next.js
        </Typography>
        <Link href="/">
          <Button>Vuelve al inicio</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default About;
