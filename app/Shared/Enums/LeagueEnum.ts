export const LEAGUE_ENUM_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const

export type LeagueType = (typeof LEAGUE_ENUM_TYPE)[keyof typeof LEAGUE_ENUM_TYPE]
