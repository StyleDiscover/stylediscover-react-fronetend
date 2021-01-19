//react imports
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//import my componsnts
import { MyComponents } from 'components';

//context and events imports
import { MainPostContext } from 'context/MainPostContext';
import { MyComponentsContext } from 'context/MyComponentContext';
import { UserContext } from 'context/UserContext';
import {
   addComponent,
   getSiteRecord,
   getSiteMedia,
} from 'events/MainPostEvents';
import { setMyComponents } from 'events/MyComponentEvents';
import { Cropper } from 'components';
import AddComponentView from './AddComponentView';

export function AddComponentContainer({
   mediaType,
   media,
   openDialog = false,
   closeDialog,
   handleSubmit,
}) {
   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { user } = useContext(UserContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   //use history
   const history = useHistory();

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);
   const [cropDialogOpen, setCropDialogOpen] = useState(false);
   const [pageUrl, setPageUrl] = useState('');
   const [mediaUrl, setMediaUrl] = useState('');
   const [mediaPreview, setMediaPreview] = useState('');
   const [componentList, setComponentList] = useState([]);

   //flags
   let componentsSeleted = Boolean(myComponentData.addComponents.length > 0);

   //useEffect
   useEffect(() => {
      handleAddDialogOpen(openDialog);
   }, [openDialog]);

   useEffect(() => {
      handleSubmit(componentList);
   }, [componentList]);

   const handleAddDialogClose = () => {
      setAddDialogOpen(false);
      closeDialog(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
   };

   const handleAddDialogOpen = (open) => {
      setPageUrl('');
      setMediaUrl('');
      setMediaPreview('');
      setAddDialogOpen(open);
   };

   const handlePageUrlChange = (event) => {
      setPageUrl(event.target.value);
   };

   const handleUploadComponentImage = (event) => {
      if (event.target.files && event.target.files[0]) {
         if (event.target.files[0].size / (1024 * 1024) < 50) {
            if (event.target.files[0].type.startsWith('image')) {
               setMediaUrl(event.target.files[0]);
               handleCropDialogOpen();
            } else {
               window.alert('Please upload an image');
            }
         } else {
            window.alert('File Size Exceeds 50 MB.');
         }
      }
   };

   const removeDuplicates = async (list) => {
      const componentsToAdd = list.filter(
         (item) => !componentList.includes(item)
      );
      setComponentList([...componentList, ...componentsToAdd]);
   };

   const handleAddDialogSubmit = async (event) => {
      event.preventDefault();
      if (myComponentData.addComponents.length > 0) {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         await removeDuplicates(myComponentData.addComponents);
         componentDispatch({ type: 'UNSET_STATE' });
         handleAddDialogClose();
      } else {
         var siteRecords;
         var hostname;
         var tempComponentId;
         var siteMediaUrl;

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

         var componentData = new FormData();
         componentData.append(
            'media_url',
            !siteMediaUrl && mediaType === 'IM'
               ? mediaUrl
                  ? mediaUrl
                  : media
               : mediaUrl
               ? mediaUrl
               : siteMediaUrl
         );
         componentData.append('page_url', pageUrl);
         componentData.append('site_records', siteRecords);
         componentData.append('is_scraped', siteMediaUrl ? true : false);

         tempComponentId = await addComponent(componentData, mainPostDispatch);
         tempComponentId = tempComponentId.toString();

         if (
            !componentList.includes(tempComponentId) &&
            tempComponentId !== '-1'
         ) {
            setComponentList([...componentList, tempComponentId]);
            handleAddDialogClose();
         }
      }
      setMyComponents(user.userData.username, componentDispatch);
   };

   //for crop
   const handleCropDialogOpen = () => {
      setCropDialogOpen(true);
   };

   return (
      <div>
         <AddComponentView
            handleAddDialogClose={handleAddDialogClose}
            handleAddDialogSubmit={handleAddDialogSubmit}
            handlePageUrlChange={handlePageUrlChange}
            handleUploadComponentImage={handleUploadComponentImage}
            addDialogOpen={addDialogOpen}
            pageUrl={pageUrl}
            mainPosts={mainPosts}
            componentsSeleted={componentsSeleted}
            mediaPreview={mediaPreview}
         />
         {/* CROPPING STARTS */}
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
         {/* CROPPING ENDS */}
      </div>
   );
}
