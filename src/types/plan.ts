/**
 * Subscription Plan & Payment types
 */

export interface Plan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  maxDevices: number;
  resolution: string;
  features: string[];
  isPopular?: boolean;
  isVip?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoRenew: boolean;
  plan?: Plan;
}
