//react imports
import React, { useState, useEffect } from 'react';

//context and events
import { sendEventAnalytics } from 'events/AnalyticsEvents';

//components imports
import { Cropper } from 'components';

//views imports
import ComponentImageView from './ComponentImageView';
import ComponentDialogView from './ComponentDialogView';
import ChangeMediaDialogView from './ChangeMediaDialogView';
import DeleteComponentView from './DeleteComponentView';

//hooks
import {
   useEditComponent,
   useGetComponentId,
   useGetSiteMedia,
   getSiteRecord,
   useAddComponent,
   useEditPost,
   useGetPostId,
} from 'hooks';

export function EditableComponentPostContainer({
   componentId,
   mainPostId,
   userId,
}) {
   //states
   const [open, setOpen] = useState(false); //buy dialog open flag
   const [mediaPreview, setMediaPreview] = useState();

   //deelte dialog
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //edit dialog
   const [changeDialogOpen, setChangeDialogOpen] = useState(false);
   const [cropDialogOpen, setCropDialogOpen] = useState(false);
   const [mediaUrl, setMediaUrl] = useState('');
   const [pageUrl, setPageUrl] = useState();

   //react-query queries
   const {
      data: componentPostData,
      status: componentPostStatus,
      error: componentPostError,
   } = useGetComponentId(componentId);
   const { data: mainPostData, status: mainPostStatus } = useGetPostId(
      mainPostId
   );

   //react-query mutations
   const { mutate: editComponent } = useEditComponent();
   const { mutate: getSiteMedia } = useGetSiteMedia();
   const { mutate: addComponent } = useAddComponent();
   const { mutate: editMainPost } = useEditPost();

   useEffect(() => {
      setPageUrl(componentPostData?.page_url);
   }, [componentPostData?.page_url, componentPostData?.media_url]);

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
      // setMediaPreview(componentPostData.media_url);
      setMediaPreview();
   };

   const handleChangeDialogOpen = (event) => {
      event.stopPropagation();
      setMediaUrl('');
      setChangeDialogOpen(true);
   };

   const handleUploadChangeMedia = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMediaUrl(event.target.files[0]);
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

      await getSiteRecord(hostname).then((data) => {
         siteRecords = data;
      });

      getSiteMedia(
         {
            siteRecords,
            url: pageUrl,
         },
         { onSuccess: (data) => (siteMediaUrl = data) }
      );

      //set component data for new component
      var newComponentData = new FormData();
      newComponentData.append(
         'media_url',
         siteMediaUrl
            ? siteMediaUrl
            : mediaUrl
            ? mediaUrl
            : componentPostData.media_url
      );
      newComponentData.append('page_url', pageUrl);
      newComponentData.append('site_records', siteRecords);

      // get a new component id

      if (componentPostData.page_url !== pageUrl && mediaUrl) {
         addComponent(
            { componentData: newComponentData, postId: mainPostId },
            {
               onSuccess: (data) => {
                  newComponentList = mainPostData?.component_posts?.filter(
                     (mainPostComponent) => mainPostComponent !== componentId
                  );
                  newComponentId = data.id;
                  newComponentList = [...newComponentList, newComponentId];
                  var newMainPostData = new FormData();
                  newComponentList.forEach((component) => {
                     newMainPostData.append('component_posts', component);
                  });

                  editMainPost({
                     id: mainPostId,
                     data: newMainPostData,
                  });
               },
            }
         );
         console.log(newComponentList);
      } else {
         newComponentList = mainPostData?.component_posts;
         editComponent({
            id: componentId,
            componentData: newComponentData,
         });
         var newMainPostData = new FormData();
         newComponentList.forEach((component) => {
            newMainPostData.append('component_posts', component);
         });

         editMainPost({
            id: mainPostId,
            data: newMainPostData,
         });
      }

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
      var newComponentList = mainPostData?.component_posts.filter(
         (component) => component !== componentId
      );

      var newMainPostData = new FormData();
      newComponentList.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      editMainPost({
         id: mainPostId,
         data: newMainPostData,
      });
      handleDeleteDialogClose();
   };

   //for crop
   const handleCropDialogOpen = () => {
      setCropDialogOpen(true);
   };

   //for component dialog
   const getWebsiteFromUrl = (url) => {
      if (url) {
         if (url.toString().split('://')[1].split('.').length > 2) {
            return url.toString().split('://')[1].split('.')[1];
         } else {
            return url.toString().split('://')[1].split('.')[0];
         }
      }
   };

   return (
      <div>
         {componentPostStatus === 'success' && (
            <ComponentImageView
               handleClickOpen={handleClickOpen}
               handleChangeDialogOpen={handleChangeDialogOpen}
               handleDeleteDialogOpen={handleDeleteDialogOpen}
               componentPostData={componentPostData}
            />
         )}
         {componentPostStatus === 'success' && (
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
            status={componentPostStatus}
            errors={componentPostError}
            handleCropDialogOpen={handleCropDialogOpen}
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
            status={componentPostStatus}
         />
      </div>
   );
}
