//react imports
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

//context and events imports
import { UserContext } from 'context/UserContext';

//MUI Imports
import { Container, Card, Divider } from '@material-ui/core';

//hooks
import { usePublish } from 'hooks';

//import components
import { AddComponents } from 'components';

//views import
import CreateHeaderView from './CreateHeaderView';
import CreateMediaImageView from './CreateMediaImageView';
import CardMediaVideoView from './CardMediaVideoView';
import AddMediaInputView from './AddMediaInputView';
import CreateContentView from './CreateContentView';
import PublishButtonView from './PublishButtonView';
import CaptionFieldView from './CaptionFieldView';

export function CreateContainer() {
   //use context
   const { user } = useContext(UserContext);

   //use history
   const history = useHistory();

   //state
   const [media, setMedia] = useState();
   const [mediaPreview, setMediaPreview] = useState();
   const [caption, setCaption] = useState('');
   const [mediaType, setMediaType] = useState('IM');
   const [componentList, setComponentList] = useState([]);

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   //flags
   let canPublish = Boolean(media);

   //hooks
   const { mutate: publish, status: publishStatus } = usePublish();

   const addMainPicture = (event) => {
      if (event.target.files && event.target.files[0]) {
         if (event.target.files[0].size / (1024 * 1024) < 50) {
            if (
               event.target.files[0].type.startsWith('image') ||
               event.target.files[0].type.startsWith('video')
            ) {
               setMedia(event.target.files[0]);
               if (event.target.files[0].type.startsWith('video')) {
                  setMediaPreview(URL.createObjectURL(event.target.files[0]));
                  setMediaType('VD');
               } else if (event.target.files[0].type.startsWith('image')) {
                  setMediaPreview(URL.createObjectURL(event.target.files[0]));
                  setMediaType('IM');
                  // handleCropDialogOpen();
               } else {
                  setMediaType('NA');
               }
            } else {
               window.alert('Please upload an image or video');
            }
         } else {
            window.alert('File Size Exceeds 50 MB.');
         }
      }
   };

   const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
   };

   //for captions
   const handleCaptionChange = (event) => {
      if (event.target.name === 'caption') {
         setCaption(event.target.value);
      }
   };

   const handlePublish = async (event) => {
      event.preventDefault();
      var mainPostData = new FormData();
      mainPostData.append('media_url', media);
      mainPostData.append('media_type', mediaType);
      mainPostData.append('caption', caption);

      publish({
         mainPostData,
         componentPostData: componentList.slice(0, 8),
         history,
      });
   };

   return (
      <Container className="margin-top-80" maxWidth="xs">
         <Card>
            <CreateHeaderView user={user} />

            <Divider />

            {media && mediaType === 'IM' && (
               <CreateMediaImageView mediaPreview={mediaPreview} />
            )}

            {media && mediaType === 'VD' && (
               <CardMediaVideoView mediaPreview={mediaPreview} />
            )}

            {!media && <AddMediaInputView addMainPicture={addMainPicture} />}

            <div style={{ padding: '0px 10px' }}>
               <CaptionFieldView
                  caption={caption}
                  handleCaptionChange={handleCaptionChange}
               />
            </div>

            <Divider />

            <CreateContentView
               componentList={componentList}
               handleAddDialogOpen={handleAddDialogOpen}
               media={media}
            />
         </Card>

         <PublishButtonView
            handlePublish={handlePublish}
            canPublish={canPublish}
            status={publishStatus}
         />

         <AddComponents
            openDialog={addDialogOpen}
            media={media}
            mediaType={mediaType}
            handleSubmit={(list) => {
               setComponentList([...list]);
            }}
            closeDialog={(close) => setAddDialogOpen(close)}
         />
      </Container>
   );
}
