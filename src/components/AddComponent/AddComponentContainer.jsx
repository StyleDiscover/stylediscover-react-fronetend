//react imports
import React, { useContext, useState, useEffect, Suspense } from 'react';

//context and events imports
import { MyComponentsContext } from 'context/MyComponentContext';
import { UserContext } from 'context/UserContext';
import { setMyComponents } from 'events/MyComponentEvents';
import { Cropper } from 'components';

//hooks
import { useAddComponent, useGetSiteMedia, getSiteRecord } from 'hooks';

const AddComponentView = React.lazy(() => import('./AddComponentView'));

export function AddComponentContainer({
   mediaType,
   media,
   openDialog = false,
   closeDialog,
   handleSubmit,
}) {
   //use context
   const { user } = useContext(UserContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

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
               setMediaPreview(URL.createObjectURL(event.target.files[0]));
               setMediaUrl(event.target.files[0]);
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

   const { mutate: getSiteMedia } = useGetSiteMedia();
   const {
      mutate: addComponent,
      status: addComponentStatus,
      error: addComponentError,
   } = useAddComponent();

   const handleAddDialogSubmit = async (event) => {
      event.preventDefault();
      if (myComponentData.addComponents.length > 0) {
         await removeDuplicates(myComponentData.addComponents);
         componentDispatch({ type: 'UNSET_STATE' });
         handleAddDialogClose();
      } else {
         if (pageUrl.startsWith('https')) {
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

            addComponent(
               { componentData },
               {
                  onSuccess: (data) => {
                     tempComponentId = data.id.toString();
                     if (!componentList.includes(tempComponentId)) {
                        setComponentList([...componentList, tempComponentId]);
                        handleAddDialogClose();
                     }
                  },
               }
            );
         } else {
            alert('Please enter a secure URL');
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
         <Suspense fallback={<>Loading...</>}>
            <AddComponentView
               handleAddDialogClose={handleAddDialogClose}
               handleAddDialogSubmit={handleAddDialogSubmit}
               handlePageUrlChange={handlePageUrlChange}
               handleUploadComponentImage={handleUploadComponentImage}
               addDialogOpen={addDialogOpen}
               pageUrl={pageUrl}
               status={addComponentStatus}
               errors={addComponentError}
               componentsSeleted={componentsSeleted}
               mediaPreview={mediaPreview}
               handleCropDialogOpen={handleCropDialogOpen}
               mediaUrl={mediaUrl}
            />
         </Suspense>
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
