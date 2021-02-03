//react imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import PostPageView from './PostPageView';
import { POST_ENCRYPTION_KEY } from 'config/Constants';

export function PostPageContainer() {
   //get the post ID
   const { id } = useParams();

   //use states
   const [postId, setPostId] = useState(null);

   useEffect(() => {
      var newId = null;
      const realId = id.replace(/\*/g, '/');
      newId = AES.decrypt(realId, POST_ENCRYPTION_KEY);
      newId = newId.toString(enc);
      setPostId(newId);
   }, []);

   return <PostPageView postId={postId} />;
}
