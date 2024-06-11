import { relations } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  integer,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const adminSchema = pgSchema('admin');

export const users = adminSchema.table('users', {
  id: serial('id').primaryKey(),
});

// Define the calories_records table
export const caloriesRecords = pgTable('calories_records', {
  totalCaloriesBurned: doublePrecision('count').notNull(),
  startTime: timestamp('from', { mode: 'date', withTimezone: true }).notNull(),
  id: uuid('id').primaryKey(),
  endTime: timestamp('to', { mode: 'date', withTimezone: true }).notNull(),
  userId: uuid('userId').notNull(),
});

// Define the distance_records table
export const distanceRecords = pgTable('distance_records', {
  distance: doublePrecision('count').notNull(),
  startTime: timestamp('from', { mode: 'date', withTimezone: true }).notNull(),
  id: uuid('id').primaryKey(),
  endTime: timestamp('to', { mode: 'date', withTimezone: true }).notNull(),
  userId: uuid('userId').notNull(),
});

// Define the steps_records table
export const stepsRecords = pgTable('steps_records', {
  count: integer('count').notNull(),
  startTime: timestamp('from', { mode: 'date', withTimezone: true }).notNull(),
  id: uuid('id').primaryKey(),
  endTime: timestamp('to', { mode: 'date', withTimezone: true }).notNull(),
  userId: uuid('userId').notNull(),
});

// Define the user_profiles table
export const userProfiles = pgTable('user_profiles', {
  code: integer('code'),
  id: serial('id').primaryKey(),
  nickname: varchar('nickname'),
  profilePicturePath: text('profilePicturePath'),
  userId: uuid('userId').notNull(),
});

export const partnershipRecord = pgTable('partnership_records', {
  id: serial('id').primaryKey(),
  initiatorUserId: uuid('initiatorUserId').notNull(),
  invitedUserId: uuid('invitedUserId').notNull(),
  isAccepted: boolean('isAccepted').default(false).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
});

export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
  partnerships: many(partnershipRecord),
  distanceRecords: many(distanceRecords),
  stepsRecords: many(stepsRecords),
  caloriesRecords: many(caloriesRecords),
}));

export const caloriesRecordsRelations = relations(
  caloriesRecords,
  ({ one }) => ({
    profile: one(userProfiles, {
      fields: [caloriesRecords.userId],
      references: [userProfiles.userId],
    }),
  }),
);

export const stepsRecordsRelations = relations(stepsRecords, ({ one }) => ({
  profile: one(userProfiles, {
    fields: [stepsRecords.userId],
    references: [userProfiles.userId],
  }),
}));

export const distanceRecordsRelations = relations(
  distanceRecords,
  ({ one }) => ({
    profile: one(userProfiles, {
      fields: [distanceRecords.userId],
      references: [userProfiles.userId],
    }),
  }),
);

export const partnershipRecordRelations = relations(
  partnershipRecord,
  ({ one }) => ({
    initiator: one(userProfiles, {
      fields: [partnershipRecord.initiatorUserId],
      references: [userProfiles.userId],
    }),
    invited: one(userProfiles, {
      fields: [partnershipRecord.invitedUserId],
      references: [userProfiles.userId],
    }),
  }),
);
