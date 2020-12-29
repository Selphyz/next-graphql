import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
interface IContent {
  url: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: '56.25%',
    position: 'relative',
  },
  iframe: {
    border: '0',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
}));
export const Content: React.FC<IContent> = ({ url }) => {
  const clases = useStyles();
  return (
    <div className={clases.container}>
      <iframe
        className={clases.iframe}
        src={url}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        loading='lazy'></iframe>
    </div>
  );
};

export default Content;
