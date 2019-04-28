import { Property } from './property';

export class Type {
  iri: string;
  name: string;
  description: string;
  properties?: Array<Property>;
}
