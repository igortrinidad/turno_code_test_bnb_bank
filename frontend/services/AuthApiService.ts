

export default class AuthApiService {

  public static async login(username: string, password: string): Promise<any> {
    const { name, version, isMobile } = useOsInfo()
    const device_name = `${name} ${version} ${isMobile ? 'Mobile' : 'Desktop'}`
    return useApi().post(`/api/user/auth/login`, { username, password, device_name })
  }

  public static async getLoggedUser(): Promise<any> {
    const scope = useUserStore().loggedUser?.role === 'admin' ? 'admin' : 'user'
    return useApi().get(`/api/user/auth/get`)
  }

}