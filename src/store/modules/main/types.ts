/**
 * Model ChatRoom
 *
 */
export interface ChatRoom {
  id: string
  roomId: string
  ownerId: string
  name: string
  img: string
  description: string | null
  category: Category
}

/**
 * Model ChannelGroup
 *
 */
export interface ChannelGroup {
  id: string
  name: string
  roomId: string
  sort: number
}

/**
 * Model Channel
 *
 */
export interface Channel {
  id: string
  name: string
  type: keyof ChannelType
  operatorId: string[]
  groupId: string
  createAt: Date
}

export interface ChannelType {
  TEXT: 'TEXT'
  VIDEO: 'VIDEO'
  AUDIO: 'AUDIO'
}

export interface Category {
  COMMON: 'COMMON'
  GAME: 'GAME'
  FRIEND: 'FRIEND'
  LIFE: 'LIFE'
  CITY: 'CITY'
}

export type ChatRoomDetail = (ChatRoom & { group: (ChannelGroup & { channel: Channel[] })[]; member: { username: string; nickname: string; avatar: string | null; bio: string | null }[] }) | null

export interface UserProfile {
  id: string
  username: string
  email: string
  avatar: string | null
  bio: string | null
  createAt: Date
  gender: Gender | null
}

export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'
