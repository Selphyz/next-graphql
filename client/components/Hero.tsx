import React from 'react';
import { Typography, Button, Box, Grid, Paper, makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import { Stream } from '../generated/graphql';
import { useAuth } from '../lib/useAuth';

interface IHero {
  stream: Stream;
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturePost: {
    marginTop: '8px',
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https:///source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
export const Hero: React.FC<IHero> = ({ stream }) => {
  const styles = useStyles();
  const { user } = useAuth();
  const showEdit = user && user._id === stream.author._id;
  return (
    <Paper className={styles.mainFeaturePost}>
      <div className={styles.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={styles.mainFeaturedPostContent}>
            <Typography component='h1' variant='h3' color='inherit' gutterBottom>
              {stream.title}
            </Typography>
            <Typography variant='h5' color='inherit' paragraph>
              {stream.description}
            </Typography>
            <Box />
            {showEdit && (
              <Link href={`edit/${stream._id}`}>
                <Button variant='outlined' color='inherit'>
                  Editar
                </Button>
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Hero;
