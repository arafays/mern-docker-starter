import env from './env';
import server from './server';

server.listen(env.PORT, () => {
  console.log('Server is running on http://localhost:3000');
});

