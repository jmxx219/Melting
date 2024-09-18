const cover = {
  normal: 'normal',
  ai: 'ai',
} as const

export type CoverType = keyof typeof cover
