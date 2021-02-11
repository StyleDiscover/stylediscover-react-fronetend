import { Button, Container, Typography } from '@material-ui/core';
import { CollectionGallery } from 'components';
import React from 'react';
//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import { POST_ENCRYPTION_KEY } from 'config/Constants';
import { SpacedBox } from './SpacedBox';
import { useHistory } from 'react-router-dom';
// import Border from 'assets/border.jpg';
import { ArrowForwardIos } from '@material-ui/icons';
export function StyleOfTheDay({ id, inspireText = 'style', background }) {
   //use states
   const [postId, setPostId] = React.useState(null);

   const history = useHistory();

   React.useEffect(() => {
      var newId = null;
      const realId = id.replace(/\*/g, '/');
      newId = AES.decrypt(realId, POST_ENCRYPTION_KEY);
      newId = newId.toString(enc);
      setPostId(newId);
   }, [id]);

   return (
      <Container maxWidth="xs">
         <div className="border" style={{ padding: 16, margin: '30px 0px' }}>
            <Typography
               variant="h4"
               align="center"
               style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  letterSpacing: 2,
               }}
            >
               STYLE OF THE DAY
            </Typography>
            <SpacedBox />
            <CollectionGallery id={postId} />
            <SpacedBox />
            <Button
               variant="contained"
               style={{
                  padding: '10px 20px',
                  //    backgroundColor: '#',
               }}
               color="primary"
               disableElevation
               fullWidth
               onClick={() => history.push(`/post/${id}`)}
            >
               <Typography variant="h6">Shop This Look</Typography>
            </Button>
            <SpacedBox />
            <Button
               variant="contained"
               fullWidth
               onClick={() => history.push(`/discoverherstyle`)}
               endIcon={<ArrowForwardIos />}
               disableElevation
               style={{
                  backgroundColor: '#ddd',
               }}
            >
               <Typography
                  variant="body1"
                  align="center"
                  style={{
                     fontFamily: 'Montserrat',
                     fontWeight: 500,
                  }}
               >
                  Get inspired from other {inspireText} of the day
               </Typography>
            </Button>
         </div>
      </Container>
   );
}
