import { Property } from './property';

export class Item {
  id: string;
  item_type: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
