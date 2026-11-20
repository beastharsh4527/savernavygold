import { Building2, GraduationCap, HeartPulse, Plane, Stethoscope, UserCheck, Users, type LucideProps } from "lucide-react";
import type { Service } from "@/content/services";

const map = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  building: Building2,
  graduation: GraduationCap,
  plane: Plane,
  "user-check": UserCheck,
  users: Users,
} as const;

export function ServiceIcon({ name, ...props }: { name: Service["icon"] } & LucideProps) {
  const C = map[name];
  return <C aria-hidden strokeWidth={1.4} {...props} />;
}
