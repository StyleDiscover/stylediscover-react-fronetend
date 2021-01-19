//react imports
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//MUI Imports
import {
   Grid,
   Hidden,
   Typography,
   Button,
   Container,
   makeStyles,
   GridList,
   GridListTile,
   CardMedia,
   Paper,
   Link as MUILink,
} from '@material-ui/core';

//MUI Icons Imports
import { ArrowForwardIos } from '@material-ui/icons';

//usestyles
const useStyles = makeStyles({
   sideImage: {
      paddingTop: '100%',
      // width: '100%',
      borderRadius: 15,
   },
   imageSlider: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
   },
   customImagePaper: {
      borderRadius: 15,
   },
   mainPostRoot: {
      backgroundPosition: 'top',
   },
});

export default function ImageSlider(props) {
   //use styles
   const classes = useStyles();

   //get props
   const { data, title, exploreMore } = props;

   //history
   const history = useHistory();

   //markups
   const gridListTileMarkup = data.map((item) => {
      return (
         <GridListTile cols={1} rows={1} key={item.imageUrls.indexOf(item)}>
            <MUILink component={Link} to={item.sliderUrl}>
               <CardMedia
                  image={item.imageUrls}
                  className={classes.sideImage}
                  classes={{
                     root: classes.mainPostRoot,
                  }}
               ></CardMedia>

               <Typography
                  align="center"
                  variant="h6"
                  style={{ marginTop: 10, fontFamily: 'Montserrat' }}
               >
                  {item.name}
               </Typography>
            </MUILink>
            <br />
            <Typography align="left" variant="body1">
               {item.content}
            </Typography>
         </GridListTile>
      );
   });

   const exploreMarkup = (
      <Button
         fullWidth={true}
         color="primary"
         variant="outlined"
         endIcon={<ArrowForwardIos />}
         onClick={() => history.push('/sd/explore')}
      >
         Explore More
      </Button>
   );

   return (
      <Container
         maxWidth="lg"
         style={{
            overflow: 'hidden',
         }}
      >
         <div style={{ marginBottom: 37.5 }}>{title}</div>
         <Hidden only={['xs']}>
            <GridList
               cellHeight="auto"
               spacing={10}
               cols={Object.keys(data).length > 3 ? 3.65 : 3}
               className={classes.imageSlider}
               spacing={75}
            >
               {gridListTileMarkup}
            </GridList>
            <br />
            <br />
            <br />
            {exploreMore && exploreMarkup}
         </Hidden>
         <Hidden smUp>
            <GridList
               cellHeight="auto"
               spacing={10}
               cols="2.65"
               className={classes.imageSlider}
            >
               {gridListTileMarkup}
            </GridList>
            {exploreMore && exploreMarkup}
         </Hidden>
      </Container>
   );
}
