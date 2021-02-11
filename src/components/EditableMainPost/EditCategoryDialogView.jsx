import React from 'react';

//MUI imports
import {
   Dialog,
   DialogActions,
   DialogContent,
   Button,
   makeStyles,
   CircularProgress,
   DialogTitle,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from '@material-ui/core';
import { useGetCategory } from 'hooks';

//MUI make style
const useStyles = makeStyles({
   customProgress: {
      marginLeft: 10,
      color: '#eeeeee',
   },
});

export default function EditCategoryDialogView({
   categoryDialog,
   handleEditCategoryClose,
   handleEditCategoryChange,
   handleEditCategorySubmit,
   status,
   category,
}) {
   //use styles
   const classes = useStyles();

   const { data: categoryData, status: categoryStatus } = useGetCategory();
   return (
      <div>
         <Dialog
            maxWidth="lg"
            open={categoryDialog}
            onClose={handleEditCategoryClose}
            aria-labelledby="change-category-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="change-category-dialog">Edit Category</DialogTitle>
            <DialogContent>
               {categoryStatus === 'success' && (
                  <FormControl variant="outlined" fullWidth>
                     <InputLabel id="mainpost-categories">Category</InputLabel>
                     <Select
                        labelId="mainpost-catagories"
                        id="category-select"
                        value={category}
                        onChange={handleEditCategoryChange}
                        label="Category"
                     >
                        {categoryData.choices.map((cat) => (
                           <MenuItem value={cat[0]?.toString()}>
                              {cat[1]}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )}
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleEditCategoryClose}
                  color="inherit"
                  disabled={status === 'loading'}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleEditCategorySubmit}
                  color="primary"
                  variant="contained"
                  disabled={status === 'loading'}
               >
                  Edit Category
                  {status === 'loading' && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
