import React from 'react';

//import component
import { PostPageMainPost, GoBackButton } from 'components';

//MUI
import { Container } from '@material-ui/core';

export default function PostPageView({ postId }) {
   return (
      postId && (
         <Container className="margin-top-80" maxWidth="lg">
            <GoBackButton />
            <PostPageMainPost id={postId} />
         </Container>
      )
   );
}
