import React from 'react';

//MUI import
import { TextField, makeStyles } from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   inputStyles: {
      marginTop: 20,
   },
});

export default function RegisterFormView({
   user,
   username,
   email,
   password,
   handleChange,
   name,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
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
            id="name"
            name="name"
            size="small"
            fullWidth={true}
            label="Name"
            type="text"
            value={name}
            helperText={user.errorData.name}
            error={user.errorData.name ? true : false}
            onChange={handleChange}
            className={classes.inputStyles}
            variant="outlined"
         />
         <br />
         <TextField
            id="email"
            name="email"
            size="small"
            fullWidth={true}
            label="Email"
            type="text"
            value={email}
            helperText={user.errorData.email}
            error={user.errorData.email ? true : false}
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
         <br />
      </div>
   );
}
