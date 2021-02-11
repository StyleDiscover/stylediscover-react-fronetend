import React from 'react';
import QuizView from './QuizView';

export function QuizContainer({ url }) {
   console.log(url);
   return (
      <div>
         <QuizView url={url} />
      </div>
   );
}
