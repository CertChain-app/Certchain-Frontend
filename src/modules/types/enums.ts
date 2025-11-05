export enum OrganizerType {
  INSTITUTE = "INSTITUTE",
  ORGANIZATION = "ORGANIZATION",
  INDIVIDUAL = "INDIVIDUAL",
  COLLEGE = "COLLEGE",
  SCHOOL = "SCHOOL",
  OTHER = "OTHER",
}

export enum EventType {
  ONLINE = "ONLINE",
  IN_PERSON = "IN_PERSON",
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ENDED = "ENDED",
}

export enum PlanFeatureStatus {
  INCLUDED = "INCLUDED",
  EXCLUDED = "EXCLUDED",
}

export enum ParticipantStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  LEFT = "LEFT",
}

export enum WebhookType {
  DISCORD = "DISCORD",
  SLACK = "SLACK",
  CUSTOM = "CUSTOM",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}
