import { UserData } from '@/modules/user/types';
import { removeLocalStorageValue, setLocalStorageValue } from '@/utilities/localStorage';
import ApiService, { ApiData } from '@/api/ApiService';

const baseUrl = process.env.REACT_APP_USERS_API_URL;

interface LoginData {
  accessToken: string;
  user: UserData;
}

class AuthService {
  private static getAuthUrl() {
    return 'authentication';
  }

  public static async login(email: string, password: string, schoolId: number): Promise<ApiData<LoginData>> {
    try {
      //get the token
      const response = await ApiService.request({
        baseURL: baseUrl,
        url: `${this.getAuthUrl()}/signIn`,
        method: 'POST',
        data: {
          email,
          password,
          schoolId,
        },
      });

      if (!response || !response.data.accessToken) {
        //login failed
        throw new Error('login failed!');
      }

      // store the x-auth-token in localStorage
      const accessToken: string = response.data.accessToken;
      setLocalStorageValue(ApiService.authTokenKey, accessToken);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static logout(): void {
    removeLocalStorageValue(ApiService.authTokenKey);
  }
}

export default AuthService;
