//react imports
import React from 'react';

//assets import
import background from '../../assets/FormBackground.png';

//MUI imports
import { Container, Grid, makeStyles } from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   mainDiv: {
      backgroundImage: `url(${background})`,
   },
   mainDivNoBack: {
      //   backgroundImage: `url(${background})`,
   },
   mainContianer: {
      padding: 25,
      backgroundColor: '#4f5964',
      color: '#eacec5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px auto',
   },
});

export default function ContentInMiddle(props) {
   //use styles
   const classes = useStyles();

   //props
   const { background } = props;

   return (
      <div
         style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: 'cover',
         }}
      >
         <Container maxWidth="lg">
            <Grid container>
               <Grid item className={classes.mainContianer} xs={12}>
                  {props.children}
               </Grid>
            </Grid>
         </Container>
      </div>
   );
}
