import { useAuth } from "../../auth/context/useAuth";
import MediaService from "../services/MediaService";
import styles from "./MediaTable.module.css";
import type { MediaFile } from "../types/mediaTypes";

interface Props {
  files: MediaFile[];
  loadFiles: () => void;
}

export default function MediaTable({ files, loadFiles }: Props) {
  const { user } = useAuth();

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await MediaService.deleteFile(id);
      alert("File deleted successfully");
      await loadFiles();
    } catch (err) {
      alert("Failed to delete file");
      console.error(err);
    }
  }

  const showUploadButton = ["admin", "superadmin"].includes(user?.role || "");
  const canDelete = ["manager", "admin", "superadmin"].includes(
    user?.role || ""
  );

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Filename</th>
            <th className={styles.th}>Uploaded</th>
            {showUploadButton && <th className={styles.th}>Uploader</th>}
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {files.length === 0 ? (
            <tr>
              <td className={styles.td}>No files available.</td>
            </tr>
          ) : (
            files.map((file) => (
              <tr key={file.id} className={styles.tr}>
                <td className={styles.td}>{file.filename}</td>
                <td className={styles.td}>
                  {new Date(file.created_at).toLocaleString()}
                </td>

                {showUploadButton && (
                  <td className={styles.td}>{file.uploader_email || "—"}</td>
                )}

                <td className={styles.td}>
                  <a
                    href={`http://localhost:3000/${file.path}`}
                    className={styles.link}
                  >
                    Download
                  </a>

                  {canDelete && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
