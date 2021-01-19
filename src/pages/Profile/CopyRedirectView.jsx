import React, { useState } from 'react';

//copy to clipboard
import { CopyToClipboard } from 'react-copy-to-clipboard';

//MUI Imports
import {
   Typography,
   Container,
   Paper,
   IconButton,
   Snackbar,
   SnackbarContent,
   Tooltip,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';

//MUI Icons Import
import { FilterNoneRounded as FilterNone, OpenInNew } from '@material-ui/icons';

//Contexts
import { UserContext } from '../../context/UserContext';

//MUI Make Styles
const useStyles = makeStyles({
   customCopyPaper: {
      margin: '10px 0px',
      padding: '10px 10px',
      display: 'flex',
      textAlign: 'center',
      backgroundColor: '#eeeeee',
      color: '#333333',
   },
   customCopyButton: {
      fontSize: '1.2em',
      color: '#333333',
   },
   customFabButton: {
      margin: '0px 3px',
      position: 'relative',
   },
   customCopySnackbar: {
      backgroundColor: '#2196f3',
   },
});

function CopyRedirectView({ username }) {
   //use styles
   const classes = useStyles();

   //states
   const [openCopySnackbar, setOpenCopySnackbar] = useState(false);

   //markup functions
   const DarkTooltip = withStyles(() => ({
      tooltip: {
         backgroundColor: '#333333',
         color: '#eeeeee',
         fontSize: 11,
      },
      arrow: {
         color: '#333333',
      },
   }))(Tooltip);

   //functions
   const handleOpenCopySnackbar = () => {
      setOpenCopySnackbar(true);
   };

   const handleCloseCopySnackbar = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenCopySnackbar(false);
   };

   return (
      <div>
         <Container maxWidth="xs" style={{ padding: 0, marginBottom: 10 }}>
            <Paper className={classes.customCopyPaper} elevation="0">
               <Typography noWrap style={{ flexGrow: 1, margin: 'auto' }}>
                  <Typography noWrap variant="body1">
                     {'stylediscover.in/' + username}
                  </Typography>
               </Typography>
               <DarkTooltip title="Copy Link" arrow>
                  <CopyToClipboard
                     text={'https://stylediscover.in/' + username}
                  >
                     <IconButton
                        size="small"
                        className={classes.customFabButton}
                        color="inherit"
                        onClick={handleOpenCopySnackbar}
                     >
                        <FilterNone className={classes.customCopyButton} />
                     </IconButton>
                  </CopyToClipboard>
               </DarkTooltip>
               <DarkTooltip title="Preview" arrow>
                  <IconButton
                     size="small"
                     className={classes.customFabButton}
                     color="inherit"
                     onClick={() => {
                        const url = 'https://stylediscover.in/' + username;
                        window.open(url, '_blank');
                     }}
                  >
                     <OpenInNew className={classes.customCopyButton} />
                  </IconButton>
               </DarkTooltip>
            </Paper>
         </Container>

         <Snackbar
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            open={openCopySnackbar}
            autoHideDuration={6000}
            onClose={handleCloseCopySnackbar}
         >
            <SnackbarContent
               className={classes.customCopySnackbar}
               action={
                  <IconButton
                     size="small"
                     aria-label="close"
                     onClick={handleCloseCopySnackbar}
                     color="inherit"
                  >
                     <Close fontSize="small" />
                  </IconButton>
               }
               message="Link Copied!"
            />
         </Snackbar>
      </div>
   );
}

export default CopyRedirectView;
