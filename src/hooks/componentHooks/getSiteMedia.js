import axios from 'axios';
import { useMutation } from 'react-query';
import { AXIOS_HEADER_JSON } from 'utils';

export function useGetSiteMedia() {
   return useMutation((data) => {
      const siteConfig = JSON.parse(data.siteRecords.xpath);
      const siteRecordData = { url: data.url, ...siteConfig };
      axios
         .post('/scrape', siteRecordData, AXIOS_HEADER_JSON)
         .then((res) => res.data.data);
   });
}
