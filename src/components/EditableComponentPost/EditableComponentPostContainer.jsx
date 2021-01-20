//react imports
import React, { useState, useEffect, useContext } from 'react';

//context and events
import { UserContext } from 'context/UserContext';
import { MainPostContext } from 'context/MainPostContext';
import { sendEventAnalytics } from 'events/AnalyticsEvents';
import {
   getComponentById,
   addComponent,
   editMainPost,
   getMainPostById,
   getSiteRecord,
   getSiteMedia,
   editComponent,
} from 'events/MainPostEvents';

//components imports
import { Cropper } from 'components';

//views imports
import ComponentImageView from './ComponentImageView';
import ComponentDialogView from './ComponentDialogView';
import ChangeMediaDialogView from './ChangeMediaDialogView';
import DeleteComponentView from './DeleteComponentView';

export function EditableComponentPostContainer({
   componentId,
   mainPostId,
   mainPostComponentList,
   userId,
   refreshMainPost,
}) {
   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag
   const [mediaPreview, setMediaPreview] = useState();

   //deelte dialog
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //edit dialog
   const [changeDialogOpen, setChangeDialogOpen] = useState(false);
   const [cropDialogOpen, setCropDialogOpen] = useState(false);
   const [mediaUrl, setMediaUrl] = useState('');
   const [pageUrl, setPageUrl] = useState();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { user } = useContext(UserContext);

   useEffect(() => {
      getComponentById(componentId).then((data) => {
         setComponentPostData(data);
         setPageUrl(data.page_url);
      });
   }, [componentId]);

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   //for change dialog
   const handleChangeDialogClose = () => {
      setChangeDialogOpen(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
      setMediaPreview();
   };

   const handleChangeDialogOpen = (event) => {
      event.stopPropagation();
      setMediaUrl('');
      setChangeDialogOpen(true);
   };

   const handleUploadChangeMedia = (event) => {
      if (event.target.files && event.target.files[0]) {
         // setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMediaUrl(event.target.files[0]);
         handleCropDialogOpen();
      }
   };

   const handleChangeMedia = async (event) => {
      event.preventDefault();

      var siteRecords;
      var siteMediaUrl;
      var hostname;
      var newComponentList;
      var newComponentId;

      //get the new media id
      if (pageUrl.startsWith('http')) {
         var tempPageUrl = new URL(pageUrl);
         var tempHostname = tempPageUrl.hostname.toString();
         if (tempHostname.startsWith('www')) {
            hostname = tempHostname.substring(4);
         } else {
            hostname = tempHostname;
         }
      }

      siteRecords = await getSiteRecord(hostname);
      siteMediaUrl = await getSiteMedia(hostname, pageUrl, mainPostDispatch);

      //set component data for new component
      var newComponentData = new FormData();
      newComponentData.append(
         'media_url',
         mediaUrl ? mediaUrl : componentPostData.media_url
      );
      newComponentData.append('page_url', pageUrl);
      newComponentData.append('site_records', siteRecords);

      // get a new component id

      if (componentPostData.page_url !== pageUrl && mediaUrl) {
         newComponentList = mainPostComponentList.filter(
            (mainPostComponent) => mainPostComponent !== componentId
         );
         newComponentId = await addComponent(
            newComponentData,
            mainPostDispatch
         );
         if (
            !newComponentList.includes(newComponentId) &&
            newComponentId !== -1
         ) {
            newComponentList = [...newComponentList, newComponentId];
         }
      } else {
         newComponentList = mainPostComponentList;
         newComponentId = await editComponent(
            newComponentData,
            componentId,
            mainPostDispatch
         );
      }

      //edit main post
      var newMainPostData = new FormData();
      newComponentList.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(newMainPostData, mainPostId, mainPostDispatch).then(
         async () => {
            await getComponentById(newComponentId).then((data) => {
               setComponentPostData(data);
               setPageUrl(data.page_url);
            });
            await getMainPostById(mainPostId, mainPostDispatch).then((data) =>
               refreshMainPost(data)
            );
         }
      );
      componentId = newComponentId;
      handleChangeDialogClose();
   };

   const handlePageUrlChange = (event) => {
      setPageUrl(event.target.value);
   };

   //for Delete dialog
   const handleDeleteDialogClose = () => {
      setDeleteDialogOpen(false);
   };

   const handleDeleteDialogOpen = (event) => {
      event.stopPropagation();
      setDeleteDialogOpen(true);
   };

   const handleDeletePost = async (event) => {
      event.preventDefault();
      var newComponentList = mainPostComponentList.filter(
         (component) => component !== componentId
      );

      var newMainPostData = new FormData();
      newComponentList.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(newMainPostData, mainPostId, mainPostDispatch).then(
         async () => {
            await getMainPostById(mainPostId, mainPostDispatch).then((data) =>
               refreshMainPost(data)
            );
         }
      );
      handleDeleteDialogClose();
   };

   //for crop
   const handleCropDialogOpen = () => {
      setCropDialogOpen(true);
   };

   //for component dialog
   const getWebsiteFromUrl = (url) => {
      if (url.toString().split('://')[1].split('.').length > 2) {
         return url.toString().split('://')[1].split('.')[1];
      } else {
         return url.toString().split('://')[1].split('.')[0];
      }
   };

   return (
      <div>
         {componentPostData && (
            <ComponentImageView
               handleClickOpen={handleClickOpen}
               handleChangeDialogOpen={handleChangeDialogOpen}
               handleDeleteDialogOpen={handleDeleteDialogOpen}
               componentPostData={componentPostData}
            />
         )}
         {componentPostData && (
            <ComponentDialogView
               handleClose={handleClose}
               open={open}
               componentId={componentId}
               componentPostData={componentPostData}
               sendEventAnalytics={sendEventAnalytics}
               userId={userId}
               mainPostId={mainPostId}
               getWebsiteFromUrl={getWebsiteFromUrl}
            />
         )}
         <ChangeMediaDialogView
            handleChangeDialogClose={handleChangeDialogClose}
            handleChangeMedia={handleChangeMedia}
            handlePageUrlChange={handlePageUrlChange}
            handleUploadChangeMedia={handleUploadChangeMedia}
            mediaPreview={mediaPreview}
            mediaUrl={mediaUrl}
            pageUrl={pageUrl}
            changeDialogOpen={changeDialogOpen}
            mainPosts={mainPosts}
         />
         <Cropper
            openDialog={cropDialogOpen}
            image={mediaUrl}
            mediaType={mediaUrl ? mediaUrl.type : 'image/jpeg'}
            mediaName={mediaUrl ? mediaUrl.name : 'example.jpeg'}
            handleSubmit={(croppedImage) => {
               setMediaPreview(croppedImage);
            }}
            handleSubmitFile={(file) => {
               setMediaUrl(file);
            }}
            closeDialog={(close) => setCropDialogOpen(close)}
         />
         <DeleteComponentView
            deleteDialogOpen={deleteDialogOpen}
            handleDeleteDialogClose={handleDeleteDialogClose}
            handleDeletePost={handleDeletePost}
            mainPosts={mainPosts}
         />
      </div>
   );
}
