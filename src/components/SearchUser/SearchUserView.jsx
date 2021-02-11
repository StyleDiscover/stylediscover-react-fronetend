import {
   Avatar,
   CircularProgress,
   Grid,
   TextField,
   Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export default function SearchUserView({
   value,
   handleChange,
   handleInputChange,
   status,
   options,
}) {
   return (
      <Autocomplete
         id="search-user"
         getOptionLabel={(option) =>
            typeof option.username === 'string' && option.username
         }
         getOptionSelected={(option, value) =>
            option.username === value.username
         }
         filterOptions={(x) => x}
         options={options && options}
         autoComplete
         includeInputInList
         value={value}
         loading={status === 'loading'}
         onChange={handleChange}
         onInputChange={handleInputChange}
         noOptionsText="No user found"
         renderInput={(params) => (
            <TextField
               {...params}
               label="Select A User"
               variant="outlined"
               fullWidth
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <React.Fragment>
                        {status === 'loading' ? (
                           <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                     </React.Fragment>
                  ),
               }}
            />
         )}
         renderOption={(option) => {
            return (
               <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                     <Avatar
                        style={{ width: 25, height: 25 }}
                        src={
                           option.profile_picture !== null
                              ? option.profile_picture
                              : ''
                        }
                     />
                  </Grid>
                  <Grid item xs>
                     <Typography variant="body2" color="textSecondary">
                        {option.username}
                     </Typography>
                  </Grid>
               </Grid>
            );
         }}
      />
   );
}
