import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { CollectionGallery } from 'components';
import { SpacedBox } from 'components/General/SpacedBox';
import { useGetPostPhotoOf } from 'hooks';
import { CREATE } from 'navigation/Constants';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MainPostPhotoOfView({
   categoryKey,
   categoryValue,
   userId,
   username,
   handleCount,
}) {
   const history = useHistory();
   const {
      data: collectionData,
      fetchNextPage: fetchNextCollection,
      hasNextPage: hasNextCollection,
      isFetchingNextPage: fetchingMoreCollection,
      status: collectionStatus,
   } = useGetPostPhotoOf(username, categoryKey, userId);

   React.useEffect(() => {
      if (collectionStatus === 'success') {
         handleCount(collectionData?.pages[0]?.count);
      }
   }, [collectionStatus, handleCount, collectionData?.pages]);

   return (
      collectionStatus === 'success' &&
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
            </Grid>
            <SpacedBox />
            <Button
               variant="outlined"
               color="primary"
               fullWidth
               onClick={() => {
                  history.push(`${CREATE}?category=${categoryKey}`);
               }}
            >
               <Typography variant="body2">
                  Create Your own <b>{categoryValue}</b> collection
               </Typography>
            </Button>
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
      )
   );
}
