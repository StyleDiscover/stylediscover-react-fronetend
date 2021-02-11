import { Container, LinearProgress } from '@material-ui/core';
import { UserContext } from 'context/UserContext';
import { useGetUser, useGetCategory } from 'hooks';
import React from 'react';
import MainPostCollectionProfileView from './MainPostCollectionProfileView';
import MainPostCollectionUserpageView from './MainPostCollectionUserpageView';
import MainPostCollectionView from './MainPostCollectionView';

export function MainPostCollectionContainer({ username, profile = true }) {
   const { data: userData, status: userStatus } = useGetUser(username);

   const { data: categories, status: categoryStatus } = useGetCategory();

   const { user } = React.useContext(UserContext);

   return (
      <Container maxWidth="md" style={{ padding: 0 }}>
         {categoryStatus === 'loading' && <LinearProgress />}
         {profile
            ? categoryStatus === 'success' &&
              categories.choices.map((cat) => (
                 <MainPostCollectionProfileView
                    categoryKey={cat[0]}
                    categoryValue={cat[1]}
                    userId={userData.id}
                    username={userData.username}
                 />
              ))
            : categoryStatus === 'success' &&
              userStatus === 'success' &&
              categories.choices.map((cat) => (
                 <MainPostCollectionUserpageView
                    categoryKey={cat[0]}
                    categoryValue={cat[1]}
                    userId={userData.id}
                    username={userData.username}
                    isAuth={user.isAuthenticated}
                 />
              ))}
         {profile &&
            categoryStatus === 'success' &&
            categories.choices.map((cat) => (
               <div>
                  <MainPostCollectionView
                     categoryKey={cat[0]}
                     categoryValue={cat[1]}
                     userId={userData.id}
                     username={userData.username}
                  />
               </div>
            ))}
      </Container>
   );
}
