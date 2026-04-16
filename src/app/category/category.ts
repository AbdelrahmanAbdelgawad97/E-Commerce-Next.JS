export interface AllCategoryResponse {
  results: number
  metadata: Metadata
  data: AllCategoryData[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface AllCategoryData {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
