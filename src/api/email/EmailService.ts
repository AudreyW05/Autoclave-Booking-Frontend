import ApiService, { ApiData } from '@/api/ApiService';

import { EmailMessage } from '@/modules/email/types';

const baseUrl = process.env.REACT_APP_BOOKINGS_API_URL;

export default class EmailService {
  private static getBookingsUrl() {
    return 'bookings';
  }

  public static async sendMail(msg: EmailMessage): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: `${this.getBookingsUrl()}/sendMail`,
          method: 'POST',
          data: {
            ...msg,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
