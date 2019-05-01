import { Property } from './property';

export class Item {
  id: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
