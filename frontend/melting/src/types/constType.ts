const cover = {
  melting: 'MELTING',
  ai: 'AI',
} as const

export const sort = {
  LATEST: 'LATEST',
  POPULAR: 'POPULAR',
} as const

export const albumCategory = {
  SINGLE: '싱글',
  MINI: '미니',
  LP: '정규',
}

export const view = {
  MY: 'MY',
  LIKED: 'LIKED',
} as const

export const tab = {
  ALBUM: 'ALBUM',
  SONG: 'SONG',
} as const

export const genres = [
  'POP',
  '발라드',
  '국내힙합',
  'OST',
  '댄스',
  '성인가요/트로트',
  'CCM',
  '아이돌',
  '국내R&B',
  '인디',
  '국내록',
  '국내포크',
  '국내일렉',
  '해외록',
  '해외일렉',
  '해외힙합',
  '해외R&B',
  '해외포크',
  '클래식',
  '재즈',
  '뉴에이지',
  'J-POP',
  '뮤지컬',
  '월드뮤직',
  '종교음악',
  '국악',
  '뮤직테라피',
] as const

export type CoverType = keyof typeof cover
export type GenreType = (typeof genres)[number]
export type SortType = keyof typeof sort
export type ViewType = keyof typeof view
export type TabType = keyof typeof tab
export type albumCategoryType = keyof typeof albumCategory
