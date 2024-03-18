export {}
declare global {

  interface Window {
    [key: string]: any;
  }

  interface AxiosRequestConfig {
    minTime?: number;
  }
}
