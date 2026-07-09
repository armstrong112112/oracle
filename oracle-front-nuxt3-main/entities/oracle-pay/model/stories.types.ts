export interface StoryHeader {
  heading: string
  subheading: string
  profileImage: string
}
export interface StoryTextStyle {
  text: string
  color: string
  fontFamily: string
  x: number
  y: number
  fontSize: number
}

export interface Story {
  id: string
  image: string
  textItems?: StoryTextStyle[] // Primary way to store text items
  // Legacy fields for backward compatibility
  text?: string
  textPosition?: string
  textStyle?: StoryTextStyle
  // Other properties
  duration?: number
  header?: StoryHeader
  viewed?: boolean
  isHighlight?: boolean
  highlightId?: string
  highlightMode?: string
  newHighlightName?: string
  selectedHighlightId?: string
  views?: number
  createdAt?: string
  isOwn?: boolean
}

export interface StoryHighlight {
  id: string
  name: string
  stories: Story[]
  coverImage: string
  createdAt?: string
  isActive?: boolean
}
