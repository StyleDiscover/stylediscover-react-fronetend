import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

//import context and event
import { MainPostContext } from 'context/MainPostContext';
import {
   getMainPostById,
   editMainPost,
   deleteMainPost,
} from 'events/MainPostEvents';

//MUI imports
import { Card } from '@material-ui/core';
import HeaderView from './HeaderView';
import ContentView from './ContentView';
import EditMenuView from './EditMenuView';
import ChangeMediaDialogView from './ChangeMediaDialogView';
import DeleteMediaDialogView from './DeleteMediaDialogView';

//crypto imports
import AES from 'crypto-js/aes';

//components imports
import { AddComponents, MainPostCaption } from 'components';
import MediaView from './MediaView';
import EditCaptionDialog from './EditCaptionDialog';

export function EditableMainPostContainer({ id }) {
   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);

   //use state
   const [mainPostData, setMainPostData] = useState(null);
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
   const encryptedId = AES.encrypt(`${id}`, 'Pjmaq7EV2C7lQeaUuLVD')
      .toString()
      .replace(/\//g, '*');

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) => {
         setMainPostData(data);
         setCaption(data.caption);
      });
   }, []);

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
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
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

      await editMainPost(
         newMainPostData,
         mainPostData.id,
         mainPostDispatch
      ).then(async () => {
         await getMainPostById(id, mainPostDispatch).then((data) =>
            setMainPostData(data)
         );
      });
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
      await deleteMainPost(mainPostData.id, mainPostDispatch);
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

      await editMainPost(
         newMainPostData,
         mainPostData.id,
         mainPostDispatch
      ).then(async () => {
         await getMainPostById(id, mainPostDispatch).then((data) =>
            setMainPostData(data)
         );
      });
      handleChangeDialogClose();
      closeEditMenu();
   };

   const refreshData = (data) => setMainPostData(data);

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

      await editMainPost(
         newMainPostData,
         mainPostData.id,
         mainPostDispatch
      ).then(async () => {
         await getMainPostById(id, mainPostDispatch).then((data) =>
            setMainPostData(data)
         );
      });
      handleEditCaptionClose();
      closeEditMenu();
   };

   const handleEditCaptionChange = (event) => {
      if (event.target.name === 'caption') {
         setCaption(event.target.value);
      }
   };

   return (
      mainPostData && (
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
               <ContentView
                  mainPostData={mainPostData}
                  id={id}
                  refreshData={refreshData}
               />
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
               mainPosts={mainPosts}
               handleUploadChangeMedia={handleUploadChangeMedia}
               handleChangeMedia={handleChangeMedia}
            />
            <DeleteMediaDialogView
               deleteDialogOpen={deleteDialogOpen}
               handleDeleteDialogClose={handleDeleteDialogClose}
               mainPosts={mainPosts}
               handleDeletePost={handleDeletePost}
            />
            <AddComponents
               openDialog={addDialogOpen}
               media={mainPostData.media_url}
               mediaType={mainPostData.media_type}
               handleSubmit={(list) => {
                  handleAddComponent(list);
               }}
               closeDialog={(close) => setAddDialogOpen(close)}
            />
            <EditCaptionDialog
               captionDialog={captionDialog}
               handleEditCaptionClose={handleEditCaptionClose}
               handleEditCaptionChange={handleEditCaptionChange}
               handleEditCaptionSubmit={handleEditCaptionSubmit}
               mainPosts={mainPosts}
               caption={caption}
            />
            {/* NON CARD VIEWS ENDS */}
         </div>
      )
   );
}
