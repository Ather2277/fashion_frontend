import conf from '../conf/conf';
import { Client, Account, ID, Databases, Models, OAuthProvider } from "appwrite";
import { toast } from "sonner";

// Define custom user type to include token info and optional photoUrl
interface CustomUser extends Models.User<Models.Preferences> {
    tokens: number;
    freetokens: number;
    photoUrl?: string;
}

export class AuthService {
    client = new Client();
    account: Account;
    databases: Databases;

    constructor() {
        try {
            const endpoint = conf.appwriteUrl || "https://cloud.appwrite.io/v1";

            this.client
                .setEndpoint(endpoint)
                .setProject(conf.appwriteProjectId);

            this.account = new Account(this.client);
            this.databases = new Databases(this.client);

            console.log("Auth service initialized with endpoint:", endpoint);
        } catch (error) {
            console.error("Error initializing auth service:", error);
        }
    }

    async createAccount({ email, password, name }: { email: string, password: string, name: string }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdUsers,
                    userAccount.$id,
                    {
                        name: userAccount.name,
                        email: userAccount.email,
                        tokens: 0,
                        freetokens: 1
                    }
                );

                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Account creation error:", error);
            throw error;
        }
    }

    async login({ email, password }: { email: string, password: string }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Login error:", error);
            throw error;
        }
    }

    async loginWithGoogle() {
        try {
            const successUrl = window.location.origin + '/';
            const failureUrl = window.location.origin + '/login';

            return await this.account.createOAuth2Session(
                'google' as OAuthProvider, // casting to fix TS error
                successUrl,
                failureUrl
            );
        } catch (error) {
            console.log("Google login error:", error);
            throw error;
        }
    }

    async getCurrentUser(): Promise<CustomUser | null> {
        try {
            const user = await this.account.get();

            if (user) {
                try {
                    const userData = await this.databases.getDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionIdUsers,
                        user.$id
                    );

                    return {
                        ...user,
                        tokens: userData.tokens || 0,
                        freetokens: userData.freetokens || 0,
                        photoUrl: user.prefs?.picture || ''
                    } as CustomUser;
                } catch (error) {
                    console.log("Failed to get user data", error);

                    try {
                        await this.databases.createDocument(
                            conf.appwriteDatabaseId,
                            conf.appwriteCollectionIdUsers,
                            user.$id,
                            {
                                name: user.name,
                                email: user.email,
                                tokens: 0,
                                freetokens: 1
                            }
                        );

                        return {
                            ...user,
                            tokens: 0,
                            freetokens: 1,
                            photoUrl: user.prefs?.picture || ''
                        } as CustomUser;
                    } catch (dbError) {
                        console.log("Failed to create user data", dbError);
                        return {
                            ...user,
                            tokens: 0,
                            freetokens: 0,
                            photoUrl: user.prefs?.picture || ''
                        } as CustomUser;
                    }
                }
            }

            return null;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async useToken(userId: string): Promise<boolean> {
        try {
            const userData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userId
            );

            if (userData.freetokens > 0) {
                await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdUsers,
                    userId,
                    { freetokens: userData.freetokens - 1 }
                );
                return true;
            } else if (userData.tokens > 0) {
                await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdUsers,
                    userId,
                    { tokens: userData.tokens - 1 }
                );
                return true;
            }

            return false;
        } catch (error) {
            console.log("Appwrite service :: useToken :: error", error);
            return false;
        }
    }

    async addTokens(userId: string, amount: number): Promise<boolean> {
        try {
            const userData = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userId
            );

            const currentTokens = userData.tokens || 0;

            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUsers,
                userId,
                { tokens: currentTokens + amount }
            );

            return true;
        } catch (error) {
            console.log("Appwrite service :: addTokens :: error", error);
            return false;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;
