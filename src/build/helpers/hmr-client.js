import { subscribe } from 'webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true'; // eslint-disable-line

subscribe((event) => {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
