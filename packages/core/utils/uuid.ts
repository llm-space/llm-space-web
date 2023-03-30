import { v4 } from 'uuid';

export function uuid() {
  const result = 'u' + v4().replaceAll('-', '');
  return result;
}
