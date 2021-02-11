import { Container, LinearProgress, Typography } from '@material-ui/core';
import { useGetUser, useGetCategory } from 'hooks';
import React from 'react';
import MainPostPhotoOfView from './MainPostPhotoOfView';

export function MainPostPhotoOfContainer({ username }) {
   const { data: userData, status: userStatus } = useGetUser(username);

   const { data: categories, status: categoryStatus } = useGetCategory();

   const [count, setCount] = React.useState(0);

   const handleCount = (c) => {
      if (c > 0 && count === 0) {
         setCount(c);
      }
   };

   return (
      <Container maxWidth="md" style={{ padding: 0 }}>
         {categoryStatus === 'loading' && <LinearProgress />}
         {categoryStatus === 'success' &&
            userStatus === 'success' &&
            categories.choices.map((cat) => (
               <MainPostPhotoOfView
                  categoryKey={cat[0]}
                  categoryValue={cat[1]}
                  userId={userData.id}
                  username={userData.username}
                  handleCount={handleCount}
               />
            ))}
         {categoryStatus !== 'loading' && count === 0 && (
            <div>
               <Typography variant="body1" align="center">
                  No Mentions
               </Typography>
            </div>
         )}
      </Container>
   );
}
