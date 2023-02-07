import FileSystem from "node:fs";

export const deleteFile = async (filename: string) => {
  try {
    await FileSystem.promises.stat(filename);
  } catch {
    return;
  }

  await FileSystem.promises.unlink(filename);
};
