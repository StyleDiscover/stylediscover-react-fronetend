import { BlogPost } from 'components';
import { BLOG_ENCRYPTION_KEY } from 'config/Constants';
import { AES } from 'crypto-js';
import enc from 'crypto-js/enc-utf8';
import React from 'react';
import { useParams } from 'react-router-dom';

export function BlogsPageContainer() {
   const { id } = useParams();
   //use states
   const [blogId, setBlogId] = React.useState(null);

   React.useEffect(() => {
      var newId = null;
      const realId = id.replace(/\*/g, '/');
      newId = AES.decrypt(realId, BLOG_ENCRYPTION_KEY);
      newId = newId.toString(enc);
      setBlogId(newId);
   }, [id]);

   return blogId && <BlogPost id={blogId} />;
}
