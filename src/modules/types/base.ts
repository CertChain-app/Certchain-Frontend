export interface IBaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  [key: string]: unknown
}

export interface ITimestamps {
  createdAt: Date
  updatedAt: Date
}
