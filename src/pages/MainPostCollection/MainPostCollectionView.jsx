import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { SpacedBox } from 'components/General/SpacedBox';
import { useGetCollectionByCategory } from 'hooks';
import { CREATE } from 'navigation/Constants';
import React from 'react';
import { useHistory } from 'react-router-dom';

//use styles
const useStyle = makeStyles({
   paperImgStyle: {
      paddingTop: '50%',
      paddingBottom: '50%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   customCreateButton: {
      fontSize: 50,
      color: '#aaa',
      position: 'absolute',
   },
});

export default function MainPostCollectionView({
   categoryKey,
   categoryValue,
   userId,
   username,
}) {
   const classes = useStyle();
   const history = useHistory();
   const { data: collectionData } = useGetCollectionByCategory(
      username,
      categoryKey,
      userId
   );

   return (
      !collectionData?.pages[0]?.count > 0 && (
         <div>
            <SpacedBox />
            <Typography variant="h5" align="center">
               {categoryValue.toString().startsWith('My')
                  ? 'Shop '
                  : 'Shop My '}{' '}
               {categoryValue.toString()}
            </Typography>
            <SpacedBox />
            <Grid container spacing={2}>
               <Grid item xs={4} style={{ height: 'auto' }}>
                  <Paper
                     className={classes.paperImgStyle}
                     variant="outlined"
                     square={true}
                     onClick={() => {
                        history.push(`${CREATE}?category=${categoryKey}`);
                     }}
                  >
                     <Add className={classes.customCreateButton} />
                  </Paper>
               </Grid>
            </Grid>
         </div>
      )
   );
}
