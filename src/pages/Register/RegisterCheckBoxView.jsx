import React from 'react';

//MUI imports
import {
   Typography,
   Link as MUILink,
   Checkbox,
   FormControlLabel,
} from '@material-ui/core';

export default function RegisterCheckBoxView({
   termAndCondition,
   iAmBrand,
   iAmInfluencer,
   handleSetState,
}) {
   return (
      <div>
         <FormControlLabel
            label={
               <Typography variant="body2">
                  I accept the Privacy Policy and{' '}
                  <MUILink
                     onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open('/policy/termsandconditions');
                     }}
                  >
                     {' '}
                     Terms and Conditions
                  </MUILink>
               </Typography>
            }
            control={
               <Checkbox
                  color="primary"
                  checked={termAndCondition}
                  onChange={() => handleSetState('tnc')}
               />
            }
            labelPlacement="end"
         />
         <br />
         <FormControlLabel
            label={<Typography variant="body2">I am a Brand</Typography>}
            control={
               <Checkbox
                  color="primary"
                  checked={iAmBrand}
                  onChange={() => handleSetState('brand')}
                  disabled={iAmInfluencer}
               />
            }
            labelPlacement="end"
         />
         <br />
         <FormControlLabel
            label={<Typography variant="body2">I am an Influencer</Typography>}
            control={
               <Checkbox
                  color="primary"
                  checked={iAmInfluencer}
                  onChange={() => handleSetState('influencer')}
                  disabled={iAmBrand}
               />
            }
            labelPlacement="end"
         />
         <br />
      </div>
   );
}
