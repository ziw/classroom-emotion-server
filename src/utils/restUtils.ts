import fetch from 'node-fetch';

const EMO_PY_SERVER_BASE_URL = 'http://35.236.114.44/';

export function analyzeImageEmotion(image: string): Promise<string> {
  const payload = { image };
  const postOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }
  return fetch(`${EMO_PY_SERVER_BASE_URL}/image`, postOptions)
          .then(res => res.text());
}