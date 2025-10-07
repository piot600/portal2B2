import { useEffect, useState } from "react";
import MediaService from "../services/MediaService";
import MediaUploadForm from "../components/MediaUploadForm";
import MediaTable from "../components/MediaTable";
import { useAuth } from "../../auth/context/useAuth";
import type { MediaFile } from "../types/mediaTypes";
import styles from "./MediaPage.module.css";

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const { user } = useAuth();

  async function loadFiles() {
    try {
      const allFiles = await MediaService.getAllFiles();
      setFiles(allFiles);
    } catch (err) {
      console.error("Failed to load media files:", err);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  if (!user) return <p>Unauthorized</p>;

  const canUpload = ["manager", "admin", "superadmin"].includes(user.role);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Media Files</h1>

      {canUpload && <MediaUploadForm loadFiles={loadFiles} />}

      <MediaTable files={files} loadFiles={loadFiles} />
    </div>
  );
}
