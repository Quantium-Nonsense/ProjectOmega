export interface ListDisplayDataModel {
  listLabels: string[];
  action?(data?: string): void;
}
