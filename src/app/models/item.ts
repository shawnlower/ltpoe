import { Property } from './property';

export class Item {
  id: string;
  itemType: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
