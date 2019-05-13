import { Property } from './property';

export class Type {
  id: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
