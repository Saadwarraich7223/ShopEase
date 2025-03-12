import { Account, Client, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        name,
        email,
        password
      );

      if (userAccount) {
        return this.lgoin({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      throw error;
    }
  }
  async lgoin({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error creating account:", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("User is not logged in:", error.message);
      return null;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Error creating account:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
