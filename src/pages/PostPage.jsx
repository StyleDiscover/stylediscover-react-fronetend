//react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

//import post
import PostPageMainPost from '../components/MainPost/PostPageMainPost';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

//MUI Imports
import {
   Card,
   CardMedia,
   CardContent,
   Grid,
   makeStyles,
   CardHeader,
   Typography,
   Avatar,
   IconButton,
   Container,
} from '@material-ui/core';

//MUI icons
import { ArrowBack } from '@material-ui/icons';

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
      console.log(realId);
      newId = AES.decrypt(realId, 'Pjmaq7EV2C7lQeaUuLVD');
      newId = newId.toString(enc);
      setPostId(newId);
   }, []);

   return (
      postId && (
         <Container className="margin-top-80" maxWidth="lg">
            <IconButton onClick={() => props.history.goBack()}>
               <ArrowBack />
            </IconButton>
            <br />
            <PostPageMainPost id={postId} />
         </Container>
      )
   );
}
