import filters from './filters';

export default {
  install: (app) => {
    const message = (html) => {
      window.M.toast({html});
    };

    const error = (html) => {
      window.M.toast({html: `[${filters.localizeFilter('Error')}]: ${html}`});
    };

    app.provide('message', message);
    app.provide('error', error);
  }
};
