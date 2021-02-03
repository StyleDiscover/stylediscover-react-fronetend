import { UserContext } from 'context/UserContext';
import { useGetBlogId } from 'hooks';
import React from 'react';
import BlogActionView from './BlogActionView';
import { MenuList } from 'components';

export function BlogActionContainer({ blogId }) {
   const { user } = React.useContext(UserContext);
   const { data: blogData, status: blogStatus } = useGetBlogId(blogId);

   const [blogMenuAnchor, setBlogMenuAnchor] = React.useState(null);

   const handleEdit = (event) => {
      event.stopPropagation();
      console.log(blogId);
   };

   const menuData = [
      {
         text: 'edit',
         action: handleEdit,
         condition: user?.userData?.username === blogData?.username,
         textStyle: {},
      },
   ];

   const handleMenuOpen = (target) => {
      setBlogMenuAnchor(target);
   };

   const handleMenuClose = (event) => {
      event.stopPropagation();
      setBlogMenuAnchor(null);
   };

   const handleAction = (event) => {
      event.stopPropagation();
      handleMenuOpen(event.currentTarget);
   };
   return (
      <div>
         {blogStatus === 'success' && (
            <BlogActionView handleAction={handleAction} />
         )}
         <MenuList
            anchor={blogMenuAnchor}
            handleClose={handleMenuClose}
            data={menuData}
         />
      </div>
   );
}
