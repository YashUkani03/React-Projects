const config = {
    appwriteURL: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectID: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteCollectionID: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteDatabaseID: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
}

export default config;