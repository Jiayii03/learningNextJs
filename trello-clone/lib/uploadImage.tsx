import { ID, storage } from '@/appwrite'

const uploadImage = async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "64f9d21753dae4acab28",
        ID.unique(),
        file
    );

    return fileUploaded;
};

export default uploadImage