import React from 'react';

import {
   Paper,
   makeStyles,
   Typography,
   TextField,
   Button,
   CircularProgress,
   Container,
} from '@material-ui/core';

import { object, string } from 'yup';
import { useFormik } from 'formik';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles({
   customPaper: {
      padding: 20,
   },
   customSubmit: {
      padding: 10,
   },
   paperImgStyle: {
      paddingTop: '50%',
      paddingBottom: '50%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #aaa',
   },
   customCreateButton: {
      fontSize: 50,
      color: '#aaa',
      position: 'absolute',
   },
   customMainImageInput: {
      display: 'None',
   },
});

const validationSchema = object({
   title: string()
      .max(250, 'Maximum character limit: 250')
      .required('Required'),
   subtitle: string()
      .max(500, 'Maximum character limit: 500')
      .required('Required'),
   body: string().required('Required'),
});

const SpaceBox = () => <div style={{ margin: 16 }} />;

export default function CreateBlogFormView({ handleSubmit, status }) {
   const classes = useStyles();

   //formik
   const formik = useFormik({
      initialValues: {
         title: '',
         subtitle: '',
         body: '',
         cover: null,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
         handleSubmit(values);
      },
   });

   return (
      <Paper className={classes.customPaper}>
         <Typography variant="h4">Create Blog</Typography>
         <SpaceBox />
         <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="xs" style={{ width: '25%' }}>
               {!formik.values.cover ? (
                  <label
                     className={classes.paperImgStyle}
                     htmlFor="icon-button-file"
                  >
                     <input
                        accept="image/*"
                        className={classes.customMainImageInput}
                        id="icon-button-file"
                        type="file"
                        name="cover"
                        onChange={(event) => {
                           formik.setFieldValue(
                              'cover',
                              event.currentTarget.files[0]
                           );
                        }}
                     />
                     <div className={classes.customCreateButton}>
                        <Add style={{ fontSize: '40' }} />
                        <Typography
                           variant="body2"
                           style={{
                              color: '#aaa',
                           }}
                        >
                           Add Cover
                        </Typography>
                     </div>
                  </label>
               ) : (
                  <div>
                     <img
                        src={URL.createObjectURL(formik.values.cover)}
                        style={{ width: '100%' }}
                        alt={formik.values.cover.name}
                     />
                  </div>
               )}
            </Container>
            <SpaceBox />
            <TextField
               fullWidth
               id="title"
               name="title"
               label="Title"
               value={formik.values.title}
               onChange={formik.handleChange}
               error={formik.touched.title && Boolean(formik.errors.title)}
               helperText={formik.touched.title && formik.errors.title}
               variant="outlined"
            />
            <SpaceBox />
            <TextField
               fullWidth
               id="subtitle"
               name="subtitle"
               label="Subtitle"
               value={formik.values.subtitle}
               onChange={formik.handleChange}
               error={
                  formik.touched.subtitle && Boolean(formik.errors.subtitle)
               }
               helperText={formik.touched.subtitle && formik.errors.subtitle}
               variant="outlined"
            />
            <SpaceBox />
            <TextField
               fullWidth
               id="body"
               name="body"
               label="Body"
               value={formik.values.body}
               onChange={formik.handleChange}
               error={formik.touched.body && Boolean(formik.errors.body)}
               helperText={formik.touched.body && formik.errors.body}
               variant="outlined"
               multiline
               rows={15}
               rowsMax={25}
            />
            <SpaceBox />
            <Button
               color="primary"
               variant="contained"
               fullWidth
               type="submit"
               className={classes.customSubmit}
               disabled={status === 'loading'}
            >
               post blog
               {status === 'loading' && (
                  <CircularProgress size={20} style={{ marginLeft: 10 }} />
               )}
            </Button>
         </form>
      </Paper>
   );
}
