import type { Story } from '@/entities/oracle-pay/model/stories.types'

export const useStoryTextStyle = () => {
  const getTextStyle = (story: Story) => {
    if (!story.textStyle) {
      return {}
    }

    return {
      color: story.textStyle.color,
      fontFamily: story.textStyle.fontFamily,
      left: `${story.textStyle.x}%`,
      top: `${story.textStyle.y}%`,
      transform: 'translate(-50%, -50%)',
      position: 'absolute' as const,
      fontSize: `${story.textStyle.fontSize || 24}px`,
      fontWeight: '600',
      maxWidth: '80%',
      textAlign: 'center' as const,
      wordWrap: 'break-word' as const,
      zIndex: 10,
    }
  }

  return {
    getTextStyle,
  }
}
