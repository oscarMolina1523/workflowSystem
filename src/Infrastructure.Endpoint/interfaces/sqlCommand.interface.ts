export interface SqlCommand {
  query: string;
  parameters: { name: string; value: any }[];
}