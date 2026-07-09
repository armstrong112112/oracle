export interface BlackListSubjectData {
  complaintType: string | number | null 
  username: string
  profileUrl: string
  telegram: string
  website: string
  email: string
  violationType: string | number | null
}

export interface BlackListDetailData {
  header: string
  description: string
}
