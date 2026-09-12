/** Organization access is independent of a personalized user identity. */
export interface SchoolAccessSession {
  schoolId: string;
  scope: "school-family";
  expiresAt: string;
  mode: "demo";
}
export interface SchoolAccessService {
  restore(schoolId: string): Promise<SchoolAccessSession | null>;
  redeem(
    schoolId: string,
    code: string,
    remember: boolean,
  ): Promise<{ session: SchoolAccessSession; remembered: boolean }>;
  forget(schoolId: string): Promise<void>;
}
/** Future identity is optional; a school family grant never needs a user ID. */
export interface PersonalIdentity {
  userId: string;
  displayName: string;
}
