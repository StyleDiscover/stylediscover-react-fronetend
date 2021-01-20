//react imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//import post
import PostPageMainPost from './MainPost/PostPageMainPost';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

//MUI Imports
import { makeStyles, IconButton, Container } from '@material-ui/core';

//MUI icons
import { GoBackButton } from 'components';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function PostPage(props) {
   //get the post ID
   const { id } = useParams();

   //use states
   const [postId, setPostId] = useState(null);

   useEffect(() => {
      var newId = null;
      const realId = id.replace(/\*/g, '/');
      newId = AES.decrypt(realId, 'Pjmaq7EV2C7lQeaUuLVD');
      newId = newId.toString(enc);
      setPostId(newId);
   }, []);

   return (
      postId && (
         <Container className="margin-top-80" maxWidth="lg">
            <GoBackButton />
            <PostPageMainPost id={postId} />
         </Container>
      )
   );
}
