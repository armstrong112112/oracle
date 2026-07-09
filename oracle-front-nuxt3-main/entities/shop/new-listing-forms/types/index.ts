export interface StepsObjectType {
  step_one: {
    category: string
    platform: string
    product: string
    subcategory: string
  }

  step_two: {
    instant_delivery_1: boolean
    instant_delivery_2: boolean
    deal_duration: string
    headers: string
    desctiption: string
    self_registred: number[]
    controlled: number[]
    account_age: {
      min: string
      max: string
    }
    upload_image: string
  }

  step_three: {
    phone_number: string
    communication: string
    quantity: string
    cost: string
    duration: {
      start: string
      end: string
    }
    plan: number[]
    terms: number[]
    regions: number[]
  }
}

export interface CheckBoxType {
  id: number
  headingA: string
  headingB: string
}
