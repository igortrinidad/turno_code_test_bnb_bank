
interface IStatementApiServiceGet {
  start_at: string
  end_at: string
  type?: string | null
  status?: string | null
}

interface IStatementApiServicePost {
  value: number
  date: string
  description: string
  type: string
  file_path?: string | null
}

export default class StatementApiService {

  public static async get({ start_at, end_at, type = null, status = null }: IStatementApiServiceGet) {
    const scope = useUserStore().loggedUser?.role === 'admin' ? 'admin' : 'user'
    return useApi().get(`/api/${ scope }/statement/get`, { params: { start_at, end_at, type, status } })
  }

  public static async show(statement_id: number | string) {
    return useApi().get(`/api/admin/statement/show/${ statement_id }`)
  }

  public static async store({ value, date, description, type = 'purchase', file_path = null }: IStatementApiServicePost) {
    return useApi().post('/api/user/statement/store', { value, date, description, type, file_path })
  }

  public static async update(statement_id: number | string, status: string) {
    return useApi().post(`/api/admin/statement/update/${ statement_id }`, { status })
  }
  
}