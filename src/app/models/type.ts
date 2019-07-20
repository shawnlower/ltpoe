import { Property } from './property';

export class Type {
  type_id: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
