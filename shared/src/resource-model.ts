export interface ResourceModel<T> {
  id?: string;
  resource?: T;
  correlationId?: string;
  created?: Date;
  href?: string;
  length?: number;
  message?: string;
  isSuccess?: boolean;
}
