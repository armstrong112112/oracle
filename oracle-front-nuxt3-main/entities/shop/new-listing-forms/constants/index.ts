import type { CheckBoxType } from '../types'

const productTypeOptions: string[] = [
  'Digital Product',
  'Physical Product',
  'Service',
  'Subscription',
  'Course',
  'Software',
  'App',
  'E-book',
  'Template',
  'Other',
]

const categoryOptions: string[] = [
  'Technology',
  'Education',
  'Business',
  'Design',
  'Marketing',
  'Health & Fitness',
  'Entertainment',
  'Finance',
  'Productivity',
  'Lifestyle',
]

const subcategoryOptions: string[] = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Digital Marketing',
  'Content Creation',
  'Project Management',
  'Analytics',
  'Automation',
]

const platformOptions: string[] = [
  'Web',
  'iOS',
  'Android',
  'Desktop',
  'SaaS',
  'Marketplace',
  'Social Media',
  'E-commerce',
  'Mobile App',
  'API',
]

const durationOptions: string[] = ['1 week', '2 week', '3 week', '4 week']

const SelfRegisterCheckbox: CheckBoxType[] = [
  { id: 1, headingA: '', headingB: 'Yes' },
  { id: 2, headingA: '', headingB: 'No' },
]

const Controlled: CheckBoxType[] = [
  { id: 1, headingA: '', headingB: 'Yes' },
  { id: 2, headingA: '', headingB: 'No' },
]

const PlanCheckbox: CheckBoxType[] = [
  { id: 1, headingA: 'Plan X', headingB: '$500' },
  { id: 2, headingA: 'Plan N', headingB: '$500' },
  { id: 3, headingA: 'Plan Y', headingB: '$500' },
  { id: 4, headingA: 'Plan A', headingB: '$500' },
]

const Terms: CheckBoxType[] = [
  {
    id: 1,
    headingA: '',
    headingB: '1 month',
  },
  {
    id: 2,
    headingA: '',
    headingB: '2 month',
  },
  {
    id: 3,
    headingA: '',
    headingB: '3 month',
  },
  {
    id: 4,
    headingA: '',
    headingB: '4 month',
  },
]

const Regions: CheckBoxType[] = [
    {
      id: 1,
      headingA: '',
      headingB: 'All Regions',
    },
    {
      id: 2,
      headingA: '',
      headingB: 'US',
    },
    {
      id: 3,
      headingA: '',
      headingB: 'EU',
    },
    {
      id: 4,
      headingA: '',
      headingB: 'Asia',
    },
    {
      id: 5,
      headingA: '',
      headingB: 'Japan',
    },
    {
      id: 6,
      headingA: '',
      headingB: 'China',
    },
  ]


export {
  productTypeOptions,
  categoryOptions,
  subcategoryOptions,
  platformOptions,
  durationOptions,
  SelfRegisterCheckbox,
  Controlled,
  PlanCheckbox,
  Terms,
  Regions
}
