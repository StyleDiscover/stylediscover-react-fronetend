//User
export { useGetUser } from './userHooks/getUser';
export { useGetUserById } from './userHooks/getUserId';
export { useGetUserToken } from './userHooks/getUserToken';
export { useSearchUser } from './userHooks/searchUser';

//Post
export { useGetPosts } from './postHooks/getUserPosts';
export { usePublish } from './postHooks/publishPost';
export { useGetPostId } from './postHooks/getPostId';
export { useEditPost } from './postHooks/editPost';
export { useDeletePost } from './postHooks/deletePost';
export { useGetPostCollection } from './postHooks/getPostCategory';
export { useGetCategory } from './postHooks/getCategories';
export { useGetCollectionByCategory } from './postHooks/getPostCategoryDetail';
export { useGetPostPhotoOf } from './postHooks/getPostPhotoOfMention';

//component
export { useAddComponent } from './componentHooks/addComponent';
export { useEditComponent } from './componentHooks/editComponent';
export { useGetComponentId } from './componentHooks/getComponentId';
export { useGetSiteMedia } from './componentHooks/getSiteMedia';
export { getSiteRecord } from './componentHooks/getSiteRecord';

//Blog
export { usePostBlog } from './blogHooks/postBlog';
export { useEditBlog } from './blogHooks/editBlog';
export { useGetBlogId } from './blogHooks/getBlogId';
export { useGetBlogs } from './blogHooks/getUserBlogs';
export { useGetAllBlogs } from './blogHooks/getAllBlog';

//wishlist
export { useGetWishlist } from './wishlistHooks/getWishlistUser';
