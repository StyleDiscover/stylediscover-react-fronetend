//react imports
import React from 'react';

//MUI imports
import { Paper, Typography, Container } from '@material-ui/core';
import { Quiz } from 'components';

export function AboutUs() {
   return (
      <Container className="margin-top-80" maxWidth="md">
         <Paper style={{ padding: 20 }}>
            <Typography variant="h4">About Us</Typography>
            <br />
            <Typography variant="body1" align="justify">
               We aim to rocket fuel retail sales in India via a discovery
               platform built for the mobile first audience of today! We are a
               team of technologists, engineers and digital marketers who are
               driven by a passion to help people provide recommendations and
               inspire shopping experiences for their followers as easily as
               possible. Our journey started when our founder who is passionate
               about women’s participation in the workforce came in touch with a
               couple of women creators. She found their journey quite inspiring
               as they were not only inspiring people to go after their passion,
               but were also helping their followers discover unique products
               from brands which they otherwise wouldn’t have discovered. The
               combination of these two convinced her that if we could build a
               purpose built platform for influencers, we could amplify their
               voices so their reviews and recommendations can be shared easily
               with their audience and can translate into beautiful shopping
               experiences for their audience.
            </Typography>
            <br />
         </Paper>
         <Quiz url="https://docs.google.com/forms/d/e/1FAIpQLScMesRJpnD7tROTLv3HOCBba_wDzWdaTw7L7dmcOgUNoas3Uw/viewform?embedded=true" />
      </Container>
   );
}
