import * as schema from './database-schema';

export type DBSchema = typeof schema;

export type IUserProfile = typeof schema.userProfiles.$inferSelect;
export type INewUserProfile = typeof schema.userProfiles.$inferInsert;

export type ICaloriesRecord = typeof schema.caloriesRecords.$inferSelect;
export type INewCaloriesRecord = typeof schema.caloriesRecords.$inferInsert;

export type IDistanceRecord = typeof schema.distanceRecords.$inferSelect;
export type INewDistanceRecord = typeof schema.distanceRecords.$inferInsert;

export type IStepsRecord = typeof schema.stepsRecords.$inferSelect;
export type INewStepsRecord = typeof schema.stepsRecords.$inferInsert;

export type IPartnershipRecord = typeof schema.partnershipRecord.$inferSelect;
export type INewPartnershipRecord =
  typeof schema.partnershipRecord.$inferInsert;
