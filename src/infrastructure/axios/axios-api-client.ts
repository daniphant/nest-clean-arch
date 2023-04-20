import axios, { AxiosInstance } from 'axios';

export class AxiosApiClient {
  _usesBearerToken: boolean;
  _token: string;
  _lastTokenRefresh: Date;
  _tries: number;
  _maxTries: number;

  private _api: AxiosInstance;

  constructor() {
    this._tries = 0;
    this._maxTries = 5;

    this._api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the request URL every time a request is made
    this._api.interceptors.request.use((config) => {
      const { url, method, headers } = config;

      console.log(`Performing ${method.toUpperCase()} request to ${url}`);

      return config;
    });

    // Retry request on error
    this._api.interceptors.response.use(
      async (response) => {
        this._tries = 0;
        return response;
      },
      async (error) => {
        if (
          error.response === undefined ||
          (error.response.status >= 500 && error.response.status < 600)
        ) {
          if (this._tries <= this._maxTries) {
            this._tries++;

            // Wait an exponential amount of time before retrying based on the number of tries
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * 2 ** (this._tries + 1)),
            );

            return this._api(error.config);
          } else {
            this._tries = 0;
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  post(url: string, data: any, config?: any): Promise<any> {
    return this._api.post(url, data, config || undefined);
  }

  get(url: string): Promise<any> {
    return this._api.get(url);
  }

  setHeaders(headers: any): void {
    this._api.defaults.headers.common = headers;
  }

  clearTries(): void {
    this._tries = 0;
  }
}
