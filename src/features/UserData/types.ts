export interface I_UserData {
  id: string | null
  login: string | null
  email: string | null
  phone: number | null
  nameFirst: string | null
  nameLast: string | null
  namePatronymic?: string
  displayName: string | null
  birthdate: Date | null
  gender: string | null
}

