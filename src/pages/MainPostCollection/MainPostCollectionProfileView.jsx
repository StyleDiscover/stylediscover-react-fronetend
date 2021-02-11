import {
   Button,
   CircularProgress,
   Grid,
   makeStyles,
   Paper,
   Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { CollectionGallery } from 'components';
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

export default function MainPostCollectionProfileView({
   categoryKey,
   categoryValue,
   userId,
   username,
}) {
   const classes = useStyle();
   const history = useHistory();
   const {
      data: collectionData,
      fetchNextPage: fetchNextCollection,
      hasNextPage: hasNextCollection,
      isFetchingNextPage: fetchingMoreCollection,
      status: collectionStatus,
   } = useGetCollectionByCategory(username, categoryKey, userId);

   return (
      <div>
         {collectionStatus === 'success' &&
            collectionData?.pages[0]?.count > 0 && (
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
                     {collectionData.pages.map((page, i) => (
                        <React.Fragment key={i}>
                           {page.results.map((post) => {
                              return (
                                 <Grid item={true} xs={4} key={post.id}>
                                    <CollectionGallery id={post.id} />
                                 </Grid>
                              );
                           })}
                        </React.Fragment>
                     ))}
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
                  <SpacedBox />
                  {hasNextCollection && (
                     <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={fetchNextCollection}
                        disabled={fetchingMoreCollection}
                     >
                        <Typography variant="body2">See More</Typography>
                        {fetchingMoreCollection && (
                           <CircularProgress
                              size={20}
                              style={{
                                 marginLeft: 10,
                              }}
                           />
                        )}
                     </Button>
                  )}
               </div>
            )}
      </div>
   );
}
