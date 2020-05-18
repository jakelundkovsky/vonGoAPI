export interface ErrorModel {
  code?: string;
  stackTrace?: string;
  created?: string;
  message?: string;
  messages?: string[];
  isSuccess?: boolean;
}
