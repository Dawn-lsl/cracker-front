/**
 * Model ChatRoom
 *
 */
export interface ChatRoom {
  id: string
  name: string
  type: ChatRoomType
  description: string | null
  createAt: Date
  creatorId: string
  memberId: string[]
}

/**
 * Model ChannelGroup
 *
 */
export interface ChannelGroup {
  id: string
  name: string
  chatRoomId: string
}

/**
 * Model Channel
 *
 */
export interface Channel {
  id: string
  name: string
  type: ChannelType
  operatorId: string[]
  groupId: string
  createAt: Date
}

export interface ChannelType {
  TEXT: 'TEXT'
  VIDEO: 'VIDEO'
  AUDIO: 'AUDIO'
}

export interface ChatRoomType {
  COMMON: 'COMMON'
  GAME: 'GAME'
  FRIEND: 'FRIEND'
  LIFE: 'LIFE'
  CITY: 'CITY'
  CLUB: 'CLUB'
}

export type ChatRoomDetail = (ChatRoom & { group: (ChannelGroup & { channel: Channel[] })[]; member: { username: string; nickname: string; avatar: string | null; bio: string | null }[] }) | null
