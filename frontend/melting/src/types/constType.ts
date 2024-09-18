const cover = {
  melting: 'melting',
  ai: 'ai',
} as const

export type CoverType = keyof typeof cover
