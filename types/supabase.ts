import { definitions } from "@/generates/supabase";
import type { CamelCasedPropertiesDeep } from "type-fest";

type User = CamelCasedPropertiesDeep<definitions["users"]>;
type TimeCard = CamelCasedPropertiesDeep<definitions["timeCards"]>;
type Profile = CamelCasedPropertiesDeep<definitions["profiles"]>;
