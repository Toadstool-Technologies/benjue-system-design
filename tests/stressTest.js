import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// export const requests = new Counter('http_reqs');

// export const options = {
//   vus: 1000,
//   duration: '15s',
// }

// const randomId = Math.floor(Math.random() * 100000);
// const url = `http://localhost:3001/qa/questions?product_id=${randomId}`;

// export default function() {
//   const res = http.get(url);
//   sleep(1);
//   check(res, {
//     'is status 200': r => r.status === 200,
//     'transaction time < 200ms': r => r.timings.duration < 200,
//     'transaction time < 500ms': r => r.timings.duration < 500,
//     'transaction time < 1000ms': r => r.timings.duration < 1000,
//     'transaction time < 2000ms': r => r.timings.duration < 2000,
//   })
// }
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1500,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 100
    }
  }
}
const randomId = Math.floor(Math.random() * 100000);
const url = `http://localhost:3001/qa/questions?product_id=${randomId}`;

export default function () {
  http.get(url);
}