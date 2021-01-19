import React from 'react';

//MUI Imports
import {
   TextField,
   Typography,
   Button,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//use styles
const useStyle = makeStyles({
   inputStyles: {
      marginTop: 20,
   },
   submitStyles: {
      marginTop: 20,
   },
   customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function LoginFormView({
   user,
   handleChange,
   username,
   password,
   handleSubmit,
}) {
   //use styles
   const classes = useStyle();
   return (
      <form noValidate onSubmit={handleSubmit}>
         <TextField
            id="username"
            name="username"
            size="small"
            fullWidth={true}
            label="Username"
            type="text"
            value={username}
            helperText={user.errorData.username}
            error={user.errorData.username ? true : false}
            onChange={handleChange}
            className={classes.inputStyles}
            variant="outlined"
         />
         <br />
         <TextField
            id="password"
            name="password"
            size="small"
            fullWidth={true}
            label="Password"
            type="password"
            value={password}
            helperText={user.errorData.password}
            error={user.errorData.password ? true : false}
            onChange={handleChange}
            className={classes.inputStyles}
            variant="outlined"
         />
         <br />
         {user.errorData.non_field_errors && (
            <Typography variant="body2" className={classes.customError}>
               {user.errorData.non_field_errors}
            </Typography>
         )}
         <div className="emailLogin">
            <Button
               type="submit"
               color="primary"
               variant="contained"
               disableElevation
               disabled={user.loading}
               className={classes.submitStyles}
            >
               Login
               {user.loading && (
                  <CircularProgress
                     size={20}
                     className={classes.customProgress}
                  />
               )}
            </Button>
         </div>
      </form>
   );
}
