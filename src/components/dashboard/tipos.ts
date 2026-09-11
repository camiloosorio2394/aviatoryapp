export type PilotStage =
  | "student_ppl"
  | "ppl"
  | "cpl_in_progress"
  | "cpl_ready"
  | "hour_building"
  | "instructor"
  | "airline_candidate"

export interface PilotState {
  stage: PilotStage | null
  total_hours: number | null
  hours_pic: number | null
  licenses: string[] | null
  icao_english_level: number | null
  target_airline: string | null
  target_date: string | null
}

export interface Profile {
  full_name: string | null
  username: string | null
  photo_url: string | null
}

export interface Streak {
  current_streak: number
  longest_streak: number
  last_activity_date: string | null
}

export interface Subscription {
  status: "trialing" | "active" | "past_due" | "canceled"
  plan: "free" | "pro_monthly" | "pro_annual" | "founder_lifetime"
  current_period_end: string | null
}

export interface Achievement {
  id: number
  code: string
  name: string
  description: string
  icon: string
  tier: "bronze" | "silver" | "gold" | "platinum"
  unlocked_at?: string
}

export interface ActivityDay {
  date: string
  activities_count: number
  questions_answered: number
}

export interface DailyQuizQuestion {
  question_id: number
  statement: string
  subject_name: string
}

export interface Peer {
  username: string
  current_streak: number
}

/** Fila de get_subject_mastery: avance real contra el banco PCA, por materia. */
export interface SubjectMastery {
  subject_id: number
  subject_name: string
  subject_slug: string
  total_questions: number
  total_attempted: number
  attempts_count: number
  avg_score: number
  mastery_level: string
}

/** Resumen NOTAM para la card de curso. Mismo cálculo que el hub del módulo. */
export interface NotamResumen {
  lesson: number
  practice: number
  best: number | null
}


/** Documento del piloto con fecha de vencimiento (licencia, médico, habilitación). */
export interface LicenseRow {
  id: string
  license_type: string
  custom_name: string | null
  expires_date: string | null
}

/** Vista user_pca_readiness: qué tan listo está el piloto para presentar el PCA. */
export interface PcaReadiness {
  attempts_60d: number | null
  avg_score_60d: number | null
  best_score: number | null
  passed_recently: boolean | null
  readiness_color: string | null
}
