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
import EditCategoryDialogView from './EditCategoryDialogView';
import EditSourceDialog from './EditSourceView';
import EditMentionDialog from './EditMentionView';

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

   //edit category
   const [category, setCategory] = useState(null);
   const [categoryDialog, setCategoryDialog] = useState(null);

   //edit source
   const [source, setSource] = useState(null);
   const [sourceDialog, setSourceDialog] = useState(null);

   //edit mention
   const [mention, setMention] = useState(null);
   const [mentionDialog, setMentionDialog] = useState(null);

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

   //use effect
   React.useEffect(() => {
      mainPostData?.caption && setCaption(mainPostData.caption);
      mainPostData?.category && setCategory(mainPostData.category);
      mainPostData?.source && setSource(mainPostData.source);
      mainPostData?.photo_of && setMention(mainPostData.photo_of);
   }, [
      mainPostData?.caption,
      mainPostData?.category,
      mainPostData?.source,
      mainPostData?.photo_of,
   ]);

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

   //for editing category
   const handleEditCategoryClose = () => {
      setCategoryDialog(false);
   };

   const handleEditCategoryOpen = () => {
      setCategoryDialog(true);
   };

   const handleEditCategorySubmit = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('category', category);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleEditCategoryClose();
      closeEditMenu();
   };

   const handleEditCategoryChange = (event) => {
      setCategory(event.target.value);
   };

   //for editing source
   const handleEditSourceClose = () => {
      setSourceDialog(false);
   };

   const handleEditSourceOpen = () => {
      setSourceDialog(true);
      console.log(sourceDialog);
   };

   const handleEditSourceSubmit = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('source', source);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleEditSourceClose();
      closeEditMenu();
   };

   const handleEditSourceChange = (event) => {
      setSource(event.target.value);
   };

   //for editing mention
   const handleEditMentionClose = () => {
      setMentionDialog(false);
   };

   const handleEditMentionOpen = () => {
      setMentionDialog(true);
      console.log(mentionDialog);
   };

   const handleEditMentionSubmit = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('photo_of', mention);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editPost({ data: newMainPostData, id });

      handleEditMentionClose();
      closeEditMenu();
   };

   const handleEditMentionChange = (user) => {
      setMention(user.id);
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
               handleEditCategoryOpen={handleEditCategoryOpen}
               handleEditSourceOpen={handleEditSourceOpen}
               handleEditMentionOpen={handleEditMentionOpen}
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
            <EditCategoryDialogView
               categoryDialog={categoryDialog}
               handleEditCategoryClose={handleEditCategoryClose}
               handleEditCategoryChange={handleEditCategoryChange}
               handleEditCategorySubmit={handleEditCategorySubmit}
               category={category}
               status={editStatus}
            />
            <EditSourceDialog
               sourceDialog={sourceDialog}
               handleEditSourceClose={handleEditSourceClose}
               handleEditSourceChange={handleEditSourceChange}
               handleEditSourceSubmit={handleEditSourceSubmit}
               source={source}
               status={editStatus}
            />
            <EditMentionDialog
               mentionDialog={mentionDialog}
               handleEditMentionClose={handleEditMentionClose}
               handleEditMentionChange={handleEditMentionChange}
               handleEditMentionSubmit={handleEditMentionSubmit}
               status={editStatus}
               mention={mention}
            />
            {/* NON CARD VIEWS ENDS */}
         </div>
      )
   );
}
