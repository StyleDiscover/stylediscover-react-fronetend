//react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//import component
import NonEditableComponentPost from '../ComponentPost/NonEditableComponentPost';

//context and events imports
import { MainPostContext } from '../../context/MainPostContext';
import { getMainPostById } from '../../events/MainPostEvents';

//MUI Imports
import {
   Card,
   CardMedia,
   CardContent,
   Grid,
   makeStyles,
} from '@material-ui/core';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function NonEditableMainPost({ id }) {
   //use styles
   const classes = useStyles();

   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //states
   const [mainPostData, setMainPostData] = useState();

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) =>
         setMainPostData(data)
      );
   }, []);

   return (
      <div>
         {mainPostData && (
            <Card>
               {/* MAIN IMAGE STARTS */}
               {mainPostData.media_type === 'IM' && (
                  <CardMedia
                     className={classes.imgStyle}
                     image={mainPostData.media_url}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                  ></CardMedia>
               )}
               {mainPostData.media_type === 'VD' && (
                  <CardMedia>
                     <video
                        // controls
                        autoPlay
                        loop
                        muted
                        style={{
                           width: '100%',
                        }}
                     >
                        <source
                           src={mainPostData.media_url}
                           title="Video"
                           type="video/mp4"
                        ></source>
                     </video>
                  </CardMedia>
               )}
               {/* MAIN IMAGE ENDS */}
               {/* COMPONENT IMAGES START */}
               <CardContent>
                  <Grid container={true} spacing={2}>
                     {mainPostData.component_posts.length > 0 &&
                        mainPostData.component_posts.map((componentId) => {
                           return (
                              <Grid item xs={3} key={componentId}>
                                 <NonEditableComponentPost
                                    componentId={componentId}
                                 />
                              </Grid>
                           );
                        })}
                  </Grid>
               </CardContent>
               {/* COMPONENT IMAGES END */}
            </Card>
         )}
      </div>
   );
}
