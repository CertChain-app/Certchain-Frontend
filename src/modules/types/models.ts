import { IBaseEntity } from "./base"
import {
  EventStatus,
  EventType,
  OrganizerType,
  ParticipantStatus,
  PaymentStatus,
  PlanFeatureStatus,
  WebhookType,
} from "./enums"

export interface IAdmin extends IBaseEntity {
  email: string
  password: string
}

export interface IOrganizerAnalytics extends IBaseEntity {
  totalRevenue: number
  totalEvents: number
  totalParticipants: number
  totalCertificates: number
  certificateRate: number
}

export interface IOrganizer extends IBaseEntity {
  logo?: string
  email: string
  phone: string
  type: OrganizerType
  subdomain: string
  name: string
  teamMembers: ITeamMember[]
  events: IEvent[]
  invitations: ITeamMemberInvitation[]
  domains: IOrganizerDomain[]
  analytics: IOrganizerAnalytics
}

export interface ITeamMember extends IBaseEntity {
  name: string
  email: string
  password: string
  organizerId: string
  organizer: IOrganizer
  verifiedAt?: Date
  participantBans: IParticipantBan[]
}

export interface IVerificationToken extends IBaseEntity {
  email: string
  token: string
  expiresAt: Date
}

export interface ITeamMemberInvitation extends IBaseEntity {
  name: string
  email: string
  organizerId: string
  organizer: IOrganizer
}

export interface IOrganizerDomain extends IBaseEntity {
  domain: string
  organizerId: string
  organizer: IOrganizer
}

export interface IUser extends IBaseEntity {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  isVerified: boolean
  verificationToken?: string
  resetPasswordToken?: string
  userEvents: IUserEvent[]
  certificates: ICertificate[]
}

export interface IEventAnalytics extends IBaseEntity {
  eventId: string
  event: IEvent
  totalParticipants: number
  totalCertificates: number
  certificateRate: number
  totalRevenue: number
  status: {
    isOngoing: boolean
    hasStarted: boolean
    hasEnded: boolean
  }
}

export interface IEvent extends IBaseEntity {
  title: string
  description: string
  startDate: Date
  endDate: Date
  completedAt?: Date
  cost: number
  banner: string
  status: EventStatus
  type: EventType
  link?: string
  password?: string
  address?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
  latitude?: number
  longitude?: number
  speakers: IEventSpeaker[]
  schedules: IEventSchedule[]
  faqs: IFAQ[]
  settings?: IEventSettings
  organizerId: string
  organizer: IOrganizer
  handle: string
  certificates: ICertificate[]
  isPaid: boolean
  isFeatured: boolean
  userEvents: IUserEvent[]
  webhooks: IEventWebhook[]
  analytics: IEventAnalytics
}

export interface IEventSpeaker extends IBaseEntity {
  name: string
  designation: string
  organization?: string
  avatar?: string
  type: string
  eventId: string
  event: IEvent
}

export interface IEventSchedule extends IBaseEntity {
  date: Date
  title: string
  description?: string
  eventId: string
  event: IEvent
}

export interface IFAQ extends IBaseEntity {
  question: string
  answer: string
  eventId: string
  event: IEvent
}

export interface IEventSettings extends IBaseEntity {
  eventId: string
  event: IEvent
  registrationEnabled: boolean
  registrationEndDate?: Date
  maxRegistrations?: number
}

export interface IEventPlanFeature extends IBaseEntity {
  name: string
  status: PlanFeatureStatus
  planId: string
  plan: IPlan
}

export interface IPlan extends IBaseEntity {
  event: IEvent
  eventId: string
  name: string
  description: string
  price: number
  features: IEventPlanFeature[]
  userEvents: IUserEvent[]
}

export interface IUserEvent extends IBaseEntity {
  user: IUser
  userId: string
  plan?: IPlan
  planId?: string
  event: IEvent
  eventId: string
  status: ParticipantStatus
  qrCode?: string
  payment?: IPayment
  ban?: IParticipantBan
  certificate?: ICertificate
}

export interface IParticipantBan extends IBaseEntity {
  userEventId: string
  userEvent: IUserEvent
  reason: string
  bannedAt: Date
  bannedById: string
  bannedBy: ITeamMember
}

export interface IEventWebhook extends IBaseEntity {
  eventId: string
  event: IEvent
  type: WebhookType
  url: string
  secret?: string
  isActive: boolean
}

export interface IPayment extends IBaseEntity {
  userEvent: IUserEvent
  userEventId: string
  amount: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  transactionId: string
}

export interface ICertificate extends IBaseEntity {
  event: IEvent
  eventId: string
  user: IUser
  userId: string
}

export interface IResetPasswordToken extends IBaseEntity {
  email: string
  token: string
  expiresAt: Date
}

export interface IConversation extends IBaseEntity {
  eventId: string
  event: IEvent
  participants: IParticipant[]
  messages: IMessage[]
}

export interface IParticipant extends IBaseEntity {
  conversationId: string
  conversation: IConversation
  userId?: string
  user?: IUser
  teamMemberId?: string
  teamMember?: ITeamMember
  messages: IMessage[]
}

export interface IMessage extends IBaseEntity {
  content: string
  conversationId?: string
  conversation?: IConversation
  senderId?: string
  sender?: IParticipant
  isAi?: boolean
}
