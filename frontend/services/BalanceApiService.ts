
export default class BalanceApiService {

  public static async get() {
    return useApi().get('/api/user/balance/get')
  }
}