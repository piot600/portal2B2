export interface MediaFile {
  id: number;
  filename: string;
  path: string;
  type: string;
  created_at: string;
  uploader_email?: string;
}
