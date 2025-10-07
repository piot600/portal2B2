import { useState } from "react";
import MediaService from "../services/MediaService";
import styles from "./MediaUploadForm.module.css";

interface Props {
  loadFiles: () => void;
}

export default function MediaUploadForm({ loadFiles }: Props) {
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await MediaService.uploadFile(formData);
      alert("File uploaded successfully!");
      setFile(null);
      await loadFiles();
    } catch {
      alert("Upload failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.uploadForm}>
      <h3 className={styles.uploadTitle}>Upload Media File</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className={styles.fileInput}
      />
      <button type="submit" className={styles.uploadButton}>
        Add File
      </button>
    </form>
  );
}
