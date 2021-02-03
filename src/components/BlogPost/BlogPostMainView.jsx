import React from 'react';
import BlogBodyView from './BlogBodyView';
import BlogCoverView from './BlogCoverView';
import BlogHeaderInfoView from './BlogHeaderInfoView';
import BlogSubtitleView from './BlogSubtitleView';
import BlogTitleView from './BlogTitleView';

export default function BlogPostMainView({ data }) {
   return (
      <div>
         <BlogHeaderInfoView
            date={data.created_at}
            username={data.username}
            id={data.id}
         />
         <BlogTitleView title={data.title} />
         {data.cover_image && (
            <BlogCoverView image={data.cover_image} title={data.title} />
         )}
         <BlogSubtitleView subtitle={data.subtitle} />
         <BlogBodyView body={data.body} />
      </div>
   );
}
