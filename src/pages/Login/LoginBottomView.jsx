import React from 'react';
import { Link } from 'react-router-dom';

//MUI Imports
import { Link as MUILink, Typography } from '@material-ui/core';

export default function LoginBottomView() {
   return (
      <div>
         <Typography variant="body2" style={{ marginTop: '20px' }}>
            Don't have an account?
            <MUILink
               style={{
                  color: '#3064ff',
                  marginLeft: '5px',
                  cursor: 'pointer',
               }}
               component={Link}
               to={`/signup?${
                  new URL(window.location.href).toString().split('?')[1]
                     ? new URL(window.location.href).toString().split('?')[1]
                     : ''
               }`}
            >
               Sign-up
            </MUILink>
         </Typography>
         <Typography variant="body2" style={{ marginTop: '10px' }}>
            Forgot your password?
            <MUILink
               style={{
                  color: '#3064ff',
                  marginLeft: '5px',
                  cursor: 'pointer',
               }}
               component={Link}
               to="/password/reset"
            >
               Reset Password
            </MUILink>
         </Typography>
      </div>
   );
}
