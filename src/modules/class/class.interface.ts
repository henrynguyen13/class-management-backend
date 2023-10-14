export enum ClassStatus {
  CREATED = 'created',
  OPENING = 'opening',
  CLOSED = 'closed',
}

export interface IUpdateClass {
  id: string;
  name?: string;
  description?: string;
  status?: string;
  avatar?: string;
}
