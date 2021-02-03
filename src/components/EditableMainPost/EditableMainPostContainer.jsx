import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//MUI imports
import { Card } from '@material-ui/core';
import HeaderView from './HeaderView';
import ContentView from './ContentView';
import EditMenuView from './EditMenuView';
import ChangeMediaDialogView from './ChangeMediaDialogView';
import DeleteMediaDialogView from './DeleteMediaDialogView';

//hooks
import { useGetPostId, useEditPost, useDeletePost } from 'hooks';

//crypto imports
import AES from 'crypto-js/aes';

//components imports
import { AddComponents, MainPostCaption } from 'components';
import MediaView from './MediaView';
import EditCaptionDialog from './EditCaptionDialog';
import { POST_ENCRYPTION_KEY } from 'config/Constants';

export function EditableMainPostContainer({ id }) {
   //use state
   const [editMenu, setEditMenu] = useState(false);
   const [mediaPreview, setMediaPreview] = useState();

   //edit dialog
   const [changeDialogOpen, setChangeDialogOpen] = useState(false);
   const [mediaUrl, setMediaUrl] = useState('');

   //deelte dialog
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   //edit caption dialog
   const [captionDialog, setCaptionDialog] = useState(false);
   const [caption, setCaption] = useState(null);

   //history
   const history = useHistory();

   //encrypted ID
   const encryptedId = AES.encrypt(`${id}`, POST_ENCRYPTION_KEY)
      .toString()
      .replace(/\//g, '*');

   //react-query
   const { data: mainPostData, status: mainPostStatus } = useGetPostId(id);
   const { mutate: editPost, status: editStatus } = useEditPost();
   const { mutate: deletePost, status: deleteStatus } = useDeletePost();

   //functions
   //edit menu
   const openEditMenu = (event) => {
      setEditMenu(event.currentTarget);
   };

   const closeEditMenu = () => {
      setEditMenu(null);
   };

   //change media functions
   const handleChangeDialogClose = () => {
      setChangeDialogOpen(false);
      setMediaPreview();
   };

   const handleChangeDialogOpen = () => {
      setMediaUrl('');
      setChangeDialogOpen(true);
   };

   const handleUploadChangeMedia = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMediaUrl(event.target.files[0]);
         // handleCropDialogOpen();
      }
   };

   const handleChangeMedia = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('media_url', mediaUrl);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleChangeDialogClose();
      closeEditMenu();
   };

   //for Delete dialog
   const handleDeleteDialogClose = () => {
      setDeleteDialogOpen(false);
   };

   const handleDeleteDialogOpen = () => {
      setDeleteDialogOpen(true);
   };

   const handleDeletePost = async (event) => {
      event.preventDefault();
      deletePost({ username: mainPostData.username, id });
      handleDeleteDialogClose();
   };

   //for adding components
   const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
   };

   const handleAddComponent = async (list) => {
      var newMainPostData = new FormData();
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      list.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleChangeDialogClose();
      closeEditMenu();
   };

   //for editing caption
   const handleEditCaptionClose = () => {
      setCaptionDialog(false);
   };

   const handleEditCaptionOpen = () => {
      setCaptionDialog(true);
   };

   const handleEditCaptionSubmit = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('caption', caption);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleEditCaptionClose();
      closeEditMenu();
   };

   const handleEditCaptionChange = (event) => {
      if (event.target.name === 'caption') {
         setCaption(event.target.value);
      }
   };

   return (
      mainPostStatus === 'success' && (
         <div>
            <Card>
               <HeaderView
                  mainPostData={mainPostData}
                  openEditMenu={openEditMenu}
               />
               <MediaView
                  history={history}
                  mainPostData={mainPostData}
                  encryptedId={encryptedId}
               />
               {mainPostData.caption !== '' && (
                  <MainPostCaption caption={mainPostData.caption} />
               )}
               <ContentView mainPostData={mainPostData} id={id} />
            </Card>

            {/* NON CARD VIEWS STARTS */}
            <EditMenuView
               editMenu={editMenu}
               closeEditMenu={closeEditMenu}
               handleChangeDialogOpen={handleChangeDialogOpen}
               handleAddDialogOpen={handleAddDialogOpen}
               handleDeleteDialogOpen={handleDeleteDialogOpen}
               handleEditCaptionOpen={handleEditCaptionOpen}
               mainPostData={mainPostData}
            />
            <ChangeMediaDialogView
               mediaUrl={mediaUrl}
               changeDialogOpen={changeDialogOpen}
               handleChangeDialogClose={handleChangeDialogClose}
               mediaPreview={mediaPreview}
               mainPostData={mainPostData}
               status={editStatus}
               handleUploadChangeMedia={handleUploadChangeMedia}
               handleChangeMedia={handleChangeMedia}
            />
            <DeleteMediaDialogView
               deleteDialogOpen={deleteDialogOpen}
               handleDeleteDialogClose={handleDeleteDialogClose}
               handleDeletePost={handleDeletePost}
               status={deleteStatus}
            />
            <AddComponents
               openDialog={addDialogOpen}
               media={mainPostData.media_url}
               mediaType={mainPostData.media_type}
               handleSubmit={(list) => {
                  if (list.length > 0) {
                     handleAddComponent(list);
                  }
               }}
               closeDialog={(close) => setAddDialogOpen(close)}
            />
            <EditCaptionDialog
               captionDialog={captionDialog}
               handleEditCaptionClose={handleEditCaptionClose}
               handleEditCaptionChange={handleEditCaptionChange}
               handleEditCaptionSubmit={handleEditCaptionSubmit}
               caption={caption}
               status={editStatus}
            />
            {/* NON CARD VIEWS ENDS */}
         </div>
      )
   );
}
