export const AXIOS_HEADER_FORMDATA = {
   headers: {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': '{{csrf_token}}',
   },
};

export const AXIOS_HEADER_JSON = {
   headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': '{{csrf_token}}',
   },
};
