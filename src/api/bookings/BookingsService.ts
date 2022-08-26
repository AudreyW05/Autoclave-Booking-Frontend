import ApiService, { ApiData } from '@/api/ApiService';
import { CreateBookingData } from '@/modules/bookings/types';

const baseUrl = process.env.REACT_APP_BOOKINGS_API_URL;

export default class BookingsService {
  private static getBookingsUrl() {
    return 'bookings';
  }

  public static async getAllBookings(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: this.getBookingsUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getBookingByUuid(uuid: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: `${this.getBookingsUrl()}/${uuid}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getSelf(userId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: `${this.getBookingsUrl()}/getSelf/${userId}`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createBooking(createBookingData: CreateBookingData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: `${this.getBookingsUrl()}/`,
          method: 'POST',
          data: {
            ...createBookingData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteBookingByUuid(uuid: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          baseURL: baseUrl,
          url: `${this.getBookingsUrl()}/${uuid}`,
          method: 'DELETE',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
