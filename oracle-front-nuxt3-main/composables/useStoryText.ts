import {
  type Story,
  type StoryTextStyle,
} from '@/entities/oracle-pay/model/stories.types'

export const useStoryText = () => {
  const getTextItems = (story: Story): StoryTextStyle[] => {
    // If story has multiple texts, return them
    if (story.textItems?.length) {
      return story.textItems
    }

    // If story has single text, convert to array format
    if (story.text) {
      return [
        {
          text: story.text,
          color: story.textStyle?.color || '#ffffff',
          fontFamily: story.textStyle?.fontFamily || 'Inter, sans-serif',
          x: story.textStyle?.x || 50,
          y: story.textStyle?.y || 50,
          fontSize: story.textStyle?.fontSize || 24,
        },
      ]
    }

    return []
  }

  const getTextItemStyle = (textItem: StoryTextStyle) => ({
    color: textItem.color,
    fontFamily: textItem.fontFamily,
    fontSize: `${textItem.fontSize}px`,
    left: `${textItem.x}%`,
    top: `${textItem.y}%`,
    transform: 'translate(-50%, -50%)',
    fontWeight: 600,
    maxWidth: '80%',
    textAlign: 'center' as const,
    wordWrap: 'break-word' as const,
  })

  return {
    getTextItems,
    getTextItemStyle,
  }
}
