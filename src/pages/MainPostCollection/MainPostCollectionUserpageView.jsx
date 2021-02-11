import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { CollectionGallery } from 'components';
import { SpacedBox } from 'components/General/SpacedBox';
import { useGetCollectionByCategory } from 'hooks';
import { CREATE, LOGIN } from 'navigation/Constants';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function MainPostCollectionUserpageView({
   categoryKey,
   categoryValue,
   userId,
   username,
   isAuth,
}) {
   const history = useHistory();
   const {
      data: collectionData,
      fetchNextPage: fetchNextCollection,
      hasNextPage: hasNextCollection,
      isFetchingNextPage: fetchingMoreCollection,
      status: collectionStatus,
   } = useGetCollectionByCategory(username, categoryKey, userId);

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
            {hasNextCollection && isAuth && (
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
            {hasNextCollection && !isAuth && (
               <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => history.push(LOGIN)}
                  disabled={fetchingMoreCollection}
               >
                  <Typography variant="body2">Login To See More</Typography>
               </Button>
            )}
         </div>
      )
   );
}
