'use strict';

import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as request from 'request';

const PORT: number = 5555;
const CLIENT_DIR: string = '../client';

const FOOD_TRUCKS_API_URL: string = 'https://www.food-trucks-deutschland.de/api/locations/getTours.json';

let app = express();
let parseUrlEncoded = bodyParser.urlencoded({extended: false});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(bodyParser.json());

app.get('*', (req, res) => res.sendFile(path.join(CLIENT_DIR, 'index.html')));
app.use('/', express.static(path.resolve(__dirname, CLIENT_DIR)));

app.post('/api/food-trucks', parseUrlEncoded, (req: any, res: express.Response) => {
  let body: any = req.body;

  console.log('POST on /api/food-trucks', body);

  let date: string = body.date || 'today';
  let latitude: number = body.latitude || -1;
  let longitude: number = body.longitude || -1;
  let radius: number = body.radius || 30;

  request
    .post(FOOD_TRUCKS_API_URL, {
      'auth': {
        'username': 'token',
        'password': '35f17d7d492347017ec251ab4098c342'
      }
    })
    .form({date, latitude, longitude, radius})
    .pipe(res);
});

app.listen(PORT, () => {
  console.log('app listening on port: ' + PORT);
});
