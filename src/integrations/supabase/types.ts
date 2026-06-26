export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          description: string
          icon: string
          id: number
          name: string
          order_index: number
          tier: string
        }
        Insert: {
          code: string
          description: string
          icon: string
          id?: number
          name: string
          order_index?: number
          tier?: string
        }
        Update: {
          code?: string
          description?: string
          icon?: string
          id?: number
          name?: string
          order_index?: number
          tier?: string
        }
        Relationships: []
      }
      ai_interactions: {
        Row: {
          attempt_id: number | null
          content: string
          conversation_id: string
          created_at: string
          feedback: string | null
          feedback_at: string | null
          id: number
          kind: string
          model: string | null
          question_id: number | null
          role: string
          tokens_input: number | null
          tokens_output: number | null
          user_id: string
        }
        Insert: {
          attempt_id?: number | null
          content: string
          conversation_id?: string
          created_at?: string
          feedback?: string | null
          feedback_at?: string | null
          id?: number
          kind: string
          model?: string | null
          question_id?: number | null
          role: string
          tokens_input?: number | null
          tokens_output?: number | null
          user_id: string
        }
        Update: {
          attempt_id?: number | null
          content?: string
          conversation_id?: string
          created_at?: string
          feedback?: string | null
          feedback_at?: string | null
          id?: number
          kind?: string
          model?: string | null
          question_id?: number | null
          role?: string
          tokens_input?: number | null
          tokens_output?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      airline_prep_exam_questions: {
        Row: {
          exam_id: number
          order_index: number | null
          question_id: number
        }
        Insert: {
          exam_id: number
          order_index?: number | null
          question_id: number
        }
        Update: {
          exam_id?: number
          order_index?: number | null
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_prep_exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_exams: {
        Row: {
          airline_id: number | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: number
          is_active: boolean | null
          passing_score: number | null
          slug: string
          title: string
          total_questions: number | null
        }
        Insert: {
          airline_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          passing_score?: number | null
          slug: string
          title: string
          total_questions?: number | null
        }
        Update: {
          airline_id?: number | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          passing_score?: number | null
          slug?: string
          title?: string
          total_questions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_exams_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_flashcards: {
        Row: {
          back: string
          created_at: string | null
          difficulty: number | null
          front: string
          id: number
          image_url: string | null
          is_active: boolean | null
          tags: string[] | null
          topic_id: number
        }
        Insert: {
          back: string
          created_at?: string | null
          difficulty?: number | null
          front: string
          id?: never
          image_url?: string | null
          is_active?: boolean | null
          tags?: string[] | null
          topic_id: number
        }
        Update: {
          back?: string
          created_at?: string | null
          difficulty?: number | null
          front?: string
          id?: never
          image_url?: string | null
          is_active?: boolean | null
          tags?: string[] | null
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_flashcards_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_mock_questions: {
        Row: {
          expected_topics: Json | null
          follow_ups: Json | null
          id: number
          ideal_duration_seconds: number | null
          mock_id: number
          notes: string | null
          order_index: number | null
          question_text: string
        }
        Insert: {
          expected_topics?: Json | null
          follow_ups?: Json | null
          id?: never
          ideal_duration_seconds?: number | null
          mock_id: number
          notes?: string | null
          order_index?: number | null
          question_text: string
        }
        Update: {
          expected_topics?: Json | null
          follow_ups?: Json | null
          id?: never
          ideal_duration_seconds?: number | null
          mock_id?: number
          notes?: string | null
          order_index?: number | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_mock_questions_mock_id_fkey"
            columns: ["mock_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_mocks"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_mocks: {
        Row: {
          airline_id: number | null
          created_at: string | null
          description: string | null
          difficulty: number | null
          duration_minutes: number | null
          icon_name: string | null
          id: number
          is_active: boolean | null
          slug: string
          title: string
          type: string
        }
        Insert: {
          airline_id?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          icon_name?: string | null
          id?: never
          is_active?: boolean | null
          slug: string
          title: string
          type: string
        }
        Update: {
          airline_id?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          icon_name?: string | null
          id?: never
          is_active?: boolean | null
          slug?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_mocks_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_questions: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          difficulty: number | null
          explanation: string | null
          id: number
          is_active: boolean | null
          metadata: Json | null
          options: Json | null
          question: string
          source_airline_id: number | null
          tags: string[] | null
          topic_id: number
          type: string
          updated_at: string | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: number | null
          explanation?: string | null
          id?: never
          is_active?: boolean | null
          metadata?: Json | null
          options?: Json | null
          question: string
          source_airline_id?: number | null
          tags?: string[] | null
          topic_id: number
          type: string
          updated_at?: string | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: number | null
          explanation?: string | null
          id?: never
          is_active?: boolean | null
          metadata?: Json | null
          options?: Json | null
          question?: string
          source_airline_id?: number | null
          tags?: string[] | null
          topic_id?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_questions_source_airline_id_fkey"
            columns: ["source_airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_prep_questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_prep_real_cases: {
        Row: {
          airline_id: number
          created_at: string | null
          duration_minutes: number | null
          id: number
          is_anonymous: boolean | null
          is_verified: boolean | null
          notes: string | null
          position: string | null
          questions_asked: Json | null
          reported_by_user_id: string | null
          result: string | null
          topics_asked: Json | null
          year_month: string | null
        }
        Insert: {
          airline_id: number
          created_at?: string | null
          duration_minutes?: number | null
          id?: never
          is_anonymous?: boolean | null
          is_verified?: boolean | null
          notes?: string | null
          position?: string | null
          questions_asked?: Json | null
          reported_by_user_id?: string | null
          result?: string | null
          topics_asked?: Json | null
          year_month?: string | null
        }
        Update: {
          airline_id?: number
          created_at?: string | null
          duration_minutes?: number | null
          id?: never
          is_anonymous?: boolean | null
          is_verified?: boolean | null
          notes?: string | null
          position?: string | null
          questions_asked?: Json | null
          reported_by_user_id?: string | null
          result?: string | null
          topics_asked?: Json | null
          year_month?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_prep_real_cases_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_prep_real_cases_reported_by_user_id_fkey"
            columns: ["reported_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      airline_prep_simulations: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: number | null
          duration_minutes: number | null
          id: number
          is_active: boolean | null
          scenario: Json
          slug: string
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          scenario: Json
          slug: string
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          scenario?: Json
          slug?: string
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      airline_prep_topics: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: number
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      airline_profiles_prep: {
        Row: {
          airline_id: number
          application_url: string | null
          common_topics: Json | null
          prep_summary: string | null
          recommended_prep_weeks: number | null
          recruiter_tips: Json | null
          salary_range_local: string | null
          salary_range_usd: string | null
          typical_process_weeks: number | null
          updated_at: string | null
        }
        Insert: {
          airline_id: number
          application_url?: string | null
          common_topics?: Json | null
          prep_summary?: string | null
          recommended_prep_weeks?: number | null
          recruiter_tips?: Json | null
          salary_range_local?: string | null
          salary_range_usd?: string | null
          typical_process_weeks?: number | null
          updated_at?: string | null
        }
        Update: {
          airline_id?: number
          application_url?: string | null
          common_topics?: Json | null
          prep_summary?: string | null
          recommended_prep_weeks?: number | null
          recruiter_tips?: Json | null
          salary_range_local?: string | null
          salary_range_usd?: string | null
          typical_process_weeks?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airline_profiles_prep_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: true
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
        ]
      }
      airline_targets: {
        Row: {
          airline_id: number
          created_at: string
          priority: number
          user_id: string
        }
        Insert: {
          airline_id: number
          created_at?: string
          priority?: number
          user_id: string
        }
        Update: {
          airline_id?: number
          created_at?: string
          priority?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "airline_targets_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "airline_targets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      airlines: {
        Row: {
          brand_color: string | null
          code: string | null
          country: string
          id: number
          logo_url: string | null
          name: string
          order_index: number
          requirements: Json
        }
        Insert: {
          brand_color?: string | null
          code?: string | null
          country: string
          id?: number
          logo_url?: string | null
          name: string
          order_index?: number
          requirements?: Json
        }
        Update: {
          brand_color?: string | null
          code?: string | null
          country?: string
          id?: number
          logo_url?: string | null
          name?: string
          order_index?: number
          requirements?: Json
        }
        Relationships: []
      }
      answer_options: {
        Row: {
          id: number
          is_correct: boolean
          order_index: number
          question_id: number
          text: string
        }
        Insert: {
          id?: number
          is_correct?: boolean
          order_index?: number
          question_id: number
          text: string
        }
        Update: {
          id?: number
          is_correct?: boolean
          order_index?: number
          question_id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          category: string | null
          checklist_id: number
          description: string | null
          id: number
          key: string
          order_index: number
          title: string
        }
        Insert: {
          category?: string | null
          checklist_id: number
          description?: string | null
          id?: number
          key: string
          order_index?: number
          title: string
        }
        Update: {
          category?: string | null
          checklist_id?: number
          description?: string | null
          id?: number
          key?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_progress: {
        Row: {
          completed_at: string
          item_id: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          item_id: number
          user_id: string
        }
        Update: {
          completed_at?: string
          item_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_progress_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "checklist_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      checklists: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          order_index: number
          stage: Database["public"]["Enums"]["pilot_stage"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          order_index?: number
          stage: Database["public"]["Enums"]["pilot_stage"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          order_index?: number
          stage?: Database["public"]["Enums"]["pilot_stage"]
        }
        Relationships: []
      }
      community_channels: {
        Row: {
          created_at: string
          description: string | null
          emoji: string | null
          id: number
          member_count: number
          name: string
          order_index: number
          slug: string
          type: Database["public"]["Enums"]["channel_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          member_count?: number
          name: string
          order_index?: number
          slug: string
          type?: Database["public"]["Enums"]["channel_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          emoji?: string | null
          id?: number
          member_count?: number
          name?: string
          order_index?: number
          slug?: string
          type?: Database["public"]["Enums"]["channel_type"]
        }
        Relationships: []
      }
      community_messages: {
        Row: {
          channel_id: number
          content: string
          created_at: string
          edited_at: string | null
          id: number
          parent_id: number | null
          user_id: string
        }
        Insert: {
          channel_id: number
          content: string
          created_at?: string
          edited_at?: string | null
          id?: number
          parent_id?: number | null
          user_id: string
        }
        Update: {
          channel_id?: number
          content?: string
          created_at?: string
          edited_at?: string | null
          id?: number
          parent_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "community_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      community_reactions: {
        Row: {
          created_at: string
          emoji: string
          message_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          message_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          message_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "community_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      daily_activity: {
        Row: {
          activities_count: number
          correct_answers: number
          date: string
          minutes_studied: number
          questions_answered: number
          user_id: string
        }
        Insert: {
          activities_count?: number
          correct_answers?: number
          date: string
          minutes_studied?: number
          questions_answered?: number
          user_id: string
        }
        Update: {
          activities_count?: number
          correct_answers?: number
          date?: string
          minutes_studied?: number
          questions_answered?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      exam_report_topics: {
        Row: {
          report_id: number
          topic_id: number
        }
        Insert: {
          report_id: number
          topic_id: number
        }
        Update: {
          report_id?: number
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_report_topics_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "exam_reports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_report_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "subject_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_reports: {
        Row: {
          created_at: string
          difficulty: number | null
          exam_date: string
          id: number
          is_anonymous: boolean
          passed: boolean
          recalled_questions: string | null
          region: Database["public"]["Enums"]["aerocivil_region"]
          score: number | null
          subject_id: number
          tips: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty?: number | null
          exam_date: string
          id?: number
          is_anonymous?: boolean
          passed: boolean
          recalled_questions?: string | null
          region?: Database["public"]["Enums"]["aerocivil_region"]
          score?: number | null
          subject_id: number
          tips?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: number | null
          exam_date?: string
          id?: number
          is_anonymous?: boolean
          passed?: boolean
          recalled_questions?: string | null
          region?: Database["public"]["Enums"]["aerocivil_region"]
          score?: number | null
          subject_id?: number
          tips?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_reports_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      flights: {
        Row: {
          aircraft_registration: string | null
          aircraft_type: string | null
          created_at: string
          cross_country_minutes: number
          dual_minutes: number
          flight_date: string
          from_airport: string | null
          id: number
          instrument_real_minutes: number
          instrument_sim_minutes: number
          landings_day: number
          landings_night: number
          night_minutes: number
          pic_minutes: number
          remarks: string | null
          sic_minutes: number
          to_airport: string | null
          total_minutes: number
          user_id: string
        }
        Insert: {
          aircraft_registration?: string | null
          aircraft_type?: string | null
          created_at?: string
          cross_country_minutes?: number
          dual_minutes?: number
          flight_date: string
          from_airport?: string | null
          id?: number
          instrument_real_minutes?: number
          instrument_sim_minutes?: number
          landings_day?: number
          landings_night?: number
          night_minutes?: number
          pic_minutes?: number
          remarks?: string | null
          sic_minutes?: number
          to_airport?: string | null
          total_minutes: number
          user_id: string
        }
        Update: {
          aircraft_registration?: string | null
          aircraft_type?: string | null
          created_at?: string
          cross_country_minutes?: number
          dual_minutes?: number
          flight_date?: string
          from_airport?: string | null
          id?: number
          instrument_real_minutes?: number
          instrument_sim_minutes?: number
          landings_day?: number
          landings_night?: number
          night_minutes?: number
          pic_minutes?: number
          remarks?: string | null
          sic_minutes?: number
          to_airport?: string | null
          total_minutes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      icao_emergencies: {
        Row: {
          created_at: string | null
          difficulty: number | null
          expected_pilot_response: string | null
          id: number
          key_vocabulary: string[] | null
          level_id: number | null
          scenario_audio_url: string | null
          scenario_description: string
          scenario_title: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          difficulty?: number | null
          expected_pilot_response?: string | null
          id?: never
          key_vocabulary?: string[] | null
          level_id?: number | null
          scenario_audio_url?: string | null
          scenario_description: string
          scenario_title: string
          slug: string
        }
        Update: {
          created_at?: string | null
          difficulty?: number | null
          expected_pilot_response?: string | null
          id?: never
          key_vocabulary?: string[] | null
          level_id?: number | null
          scenario_audio_url?: string | null
          scenario_description?: string
          scenario_title?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "icao_emergencies_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "icao_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      icao_exercises: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          difficulty: number | null
          estimated_seconds: number | null
          expected_response: string | null
          id: number
          is_active: boolean | null
          level_id: number
          metadata: Json | null
          options: Json | null
          prompt_audio_url: string | null
          prompt_text: string | null
          reference_audio_url: string | null
          skill_id: number
          slug: string
          title: string
          type: string
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: number | null
          estimated_seconds?: number | null
          expected_response?: string | null
          id?: never
          is_active?: boolean | null
          level_id: number
          metadata?: Json | null
          options?: Json | null
          prompt_audio_url?: string | null
          prompt_text?: string | null
          reference_audio_url?: string | null
          skill_id: number
          slug: string
          title: string
          type: string
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          difficulty?: number | null
          estimated_seconds?: number | null
          expected_response?: string | null
          id?: never
          is_active?: boolean | null
          level_id?: number
          metadata?: Json | null
          options?: Json | null
          prompt_audio_url?: string | null
          prompt_text?: string | null
          reference_audio_url?: string | null
          skill_id?: number
          slug?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "icao_exercises_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "icao_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "icao_exercises_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "icao_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      icao_levels: {
        Row: {
          color: string | null
          description: string | null
          exit_criteria: Json | null
          id: number
          title: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          exit_criteria?: Json | null
          id: number
          title: string
        }
        Update: {
          color?: string | null
          description?: string | null
          exit_criteria?: Json | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      icao_phrases: {
        Row: {
          audio_url: string | null
          category: string
          context: string | null
          created_at: string | null
          doc_reference: string | null
          id: number
          is_active: boolean | null
          phrase_en: string
          phrase_es: string | null
          variant: string | null
        }
        Insert: {
          audio_url?: string | null
          category: string
          context?: string | null
          created_at?: string | null
          doc_reference?: string | null
          id?: never
          is_active?: boolean | null
          phrase_en: string
          phrase_es?: string | null
          variant?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string
          context?: string | null
          created_at?: string | null
          doc_reference?: string | null
          id?: never
          is_active?: boolean | null
          phrase_en?: string
          phrase_es?: string | null
          variant?: string | null
        }
        Relationships: []
      }
      icao_quiz_questions: {
        Row: {
          context: string | null
          correct_answer: string
          created_at: string | null
          difficulty: number | null
          explanation: string | null
          id: number
          is_active: boolean | null
          options: Json
          prompt: string
          related_vocab: string[] | null
          topic: string
        }
        Insert: {
          context?: string | null
          correct_answer: string
          created_at?: string | null
          difficulty?: number | null
          explanation?: string | null
          id?: never
          is_active?: boolean | null
          options: Json
          prompt: string
          related_vocab?: string[] | null
          topic?: string
        }
        Update: {
          context?: string | null
          correct_answer?: string
          created_at?: string | null
          difficulty?: number | null
          explanation?: string | null
          id?: never
          is_active?: boolean | null
          options?: Json
          prompt?: string
          related_vocab?: string[] | null
          topic?: string
        }
        Relationships: []
      }
      icao_roleplays: {
        Row: {
          atc_script: Json
          created_at: string | null
          difficulty: number | null
          duration_minutes: number | null
          id: number
          is_active: boolean | null
          level_id: number | null
          pilot_script: Json | null
          scenario: string
          slug: string
          title: string
        }
        Insert: {
          atc_script: Json
          created_at?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          level_id?: number | null
          pilot_script?: Json | null
          scenario: string
          slug: string
          title: string
        }
        Update: {
          atc_script?: Json
          created_at?: string | null
          difficulty?: number | null
          duration_minutes?: number | null
          id?: never
          is_active?: boolean | null
          level_id?: number | null
          pilot_script?: Json | null
          scenario?: string
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "icao_roleplays_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "icao_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      icao_skills: {
        Row: {
          description: string | null
          icao_descriptor: string | null
          icon_name: string | null
          id: number
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          description?: string | null
          icao_descriptor?: string | null
          icon_name?: string | null
          id?: never
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          description?: string | null
          icao_descriptor?: string | null
          icon_name?: string | null
          id?: never
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      icao_vocabulary: {
        Row: {
          audio_url: string | null
          category: string
          created_at: string | null
          definition: string
          example: string | null
          id: number
          is_active: boolean | null
          term_en: string
          translation_es: string
        }
        Insert: {
          audio_url?: string | null
          category?: string
          created_at?: string | null
          definition: string
          example?: string | null
          id?: never
          is_active?: boolean | null
          term_en: string
          translation_es: string
        }
        Update: {
          audio_url?: string | null
          category?: string
          created_at?: string | null
          definition?: string
          example?: string | null
          id?: never
          is_active?: boolean | null
          term_en?: string
          translation_es?: string
        }
        Relationships: []
      }
      interview_sim_categories: {
        Row: {
          color: string | null
          description: string | null
          icon_name: string | null
          id: number
          name: string
          order_index: number | null
          slug: string
          type: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name: string
          order_index?: number | null
          slug: string
          type: string
        }
        Update: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name?: string
          order_index?: number | null
          slug?: string
          type?: string
        }
        Relationships: []
      }
      interview_sim_feedback: {
        Row: {
          feedback_text: string | null
          filler_words_count: number | null
          filler_words_list: Json | null
          generated_at: string | null
          id: number
          improvements: Json | null
          pace_assessment: string | null
          pace_wpm: number | null
          recording_id: number
          score_clarity: number | null
          score_communication: number | null
          score_confidence: number | null
          score_content: number | null
          score_overall: number | null
          silences_count: number | null
          strengths: Json | null
        }
        Insert: {
          feedback_text?: string | null
          filler_words_count?: number | null
          filler_words_list?: Json | null
          generated_at?: string | null
          id?: never
          improvements?: Json | null
          pace_assessment?: string | null
          pace_wpm?: number | null
          recording_id: number
          score_clarity?: number | null
          score_communication?: number | null
          score_confidence?: number | null
          score_content?: number | null
          score_overall?: number | null
          silences_count?: number | null
          strengths?: Json | null
        }
        Update: {
          feedback_text?: string | null
          filler_words_count?: number | null
          filler_words_list?: Json | null
          generated_at?: string | null
          id?: never
          improvements?: Json | null
          pace_assessment?: string | null
          pace_wpm?: number | null
          recording_id?: number
          score_clarity?: number | null
          score_communication?: number | null
          score_confidence?: number | null
          score_content?: number | null
          score_overall?: number | null
          silences_count?: number | null
          strengths?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_sim_feedback_recording_id_fkey"
            columns: ["recording_id"]
            isOneToOne: false
            referencedRelation: "interview_sim_recordings"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sim_questions: {
        Row: {
          airline_id: number | null
          category_id: number
          created_at: string | null
          difficulty: number | null
          expected_topics: Json | null
          follow_ups: Json | null
          id: number
          ideal_duration_seconds: number | null
          intent: string | null
          is_active: boolean | null
          order_index: number | null
          question_audio_url: string | null
          question_text: string
          slug: string
        }
        Insert: {
          airline_id?: number | null
          category_id: number
          created_at?: string | null
          difficulty?: number | null
          expected_topics?: Json | null
          follow_ups?: Json | null
          id?: never
          ideal_duration_seconds?: number | null
          intent?: string | null
          is_active?: boolean | null
          order_index?: number | null
          question_audio_url?: string | null
          question_text: string
          slug: string
        }
        Update: {
          airline_id?: number | null
          category_id?: number
          created_at?: string | null
          difficulty?: number | null
          expected_topics?: Json | null
          follow_ups?: Json | null
          id?: never
          ideal_duration_seconds?: number | null
          intent?: string | null
          is_active?: boolean | null
          order_index?: number | null
          question_audio_url?: string | null
          question_text?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_sim_questions_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_sim_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "interview_sim_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sim_recordings: {
        Row: {
          audio_url: string | null
          duration_seconds: number | null
          id: number
          question_id: number | null
          recorded_at: string | null
          session_id: number
          transcript: string | null
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          duration_seconds?: number | null
          id?: never
          question_id?: number | null
          recorded_at?: string | null
          session_id: number
          transcript?: string | null
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          duration_seconds?: number | null
          id?: never
          question_id?: number | null
          recorded_at?: string | null
          session_id?: number
          transcript?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_sim_recordings_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "interview_sim_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_sim_recordings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "interview_sim_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sim_sessions: {
        Row: {
          airline_id: number | null
          category_id: number | null
          ended_at: string | null
          id: number
          started_at: string | null
          status: string | null
          total_questions: number | null
          user_id: string
        }
        Insert: {
          airline_id?: number | null
          category_id?: number | null
          ended_at?: string | null
          id?: never
          started_at?: string | null
          status?: string | null
          total_questions?: number | null
          user_id: string
        }
        Update: {
          airline_id?: number | null
          category_id?: number | null
          ended_at?: string | null
          id?: never
          started_at?: string | null
          status?: string | null
          total_questions?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_sim_sessions_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_sim_sessions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "interview_sim_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_sim_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      library_categories: {
        Row: {
          color: string | null
          description: string | null
          icon_name: string | null
          id: number
          name: string
          order_index: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name: string
          order_index?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          description?: string | null
          icon_name?: string | null
          id?: never
          name?: string
          order_index?: number | null
          slug?: string
        }
        Relationships: []
      }
      library_items: {
        Row: {
          aircraft_type: string | null
          authors: string | null
          category_id: number
          content_md: string | null
          created_at: string | null
          description: string | null
          embed_url: string | null
          file_url: string | null
          id: number
          is_premium: boolean | null
          is_published: boolean | null
          language: string | null
          order_index: number | null
          published_at: string | null
          slug: string
          source: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
          version: string | null
          views_count: number | null
        }
        Insert: {
          aircraft_type?: string | null
          authors?: string | null
          category_id: number
          content_md?: string | null
          created_at?: string | null
          description?: string | null
          embed_url?: string | null
          file_url?: string | null
          id?: never
          is_premium?: boolean | null
          is_published?: boolean | null
          language?: string | null
          order_index?: number | null
          published_at?: string | null
          slug: string
          source?: string | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
          version?: string | null
          views_count?: number | null
        }
        Update: {
          aircraft_type?: string | null
          authors?: string | null
          category_id?: number
          content_md?: string | null
          created_at?: string | null
          description?: string | null
          embed_url?: string | null
          file_url?: string | null
          id?: never
          is_premium?: boolean | null
          is_published?: boolean | null
          language?: string | null
          order_index?: number | null
          published_at?: string | null
          slug?: string
          source?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
          version?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "library_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "library_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses_held: {
        Row: {
          created_at: string
          custom_name: string | null
          document_url: string | null
          expires_date: string | null
          id: number
          issued_date: string | null
          license_type: Database["public"]["Enums"]["license_type"]
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_name?: string | null
          document_url?: string | null
          expires_date?: string | null
          id?: number
          issued_date?: string | null
          license_type: Database["public"]["Enums"]["license_type"]
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          custom_name?: string | null
          document_url?: string | null
          expires_date?: string | null
          id?: number
          issued_date?: string | null
          license_type?: Database["public"]["Enums"]["license_type"]
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "licenses_held_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          body: string | null
          created_at: string
          icon: string | null
          id: number
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_url?: string | null
          body?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_url?: string | null
          body?: string | null
          created_at?: string
          icon?: string | null
          id?: number
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      pca_exam_questions: {
        Row: {
          exam_id: number
          order_index: number | null
          question_id: number
        }
        Insert: {
          exam_id: number
          order_index?: number | null
          question_id: number
        }
        Update: {
          exam_id?: number
          order_index?: number | null
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pca_exam_questions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "pca_exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pca_exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      pca_exams: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          exam_type: string | null
          id: number
          is_active: boolean | null
          passing_score: number | null
          slug: string
          title: string
          total_questions: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          exam_type?: string | null
          id?: never
          is_active?: boolean | null
          passing_score?: number | null
          slug: string
          title: string
          total_questions?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          exam_type?: string | null
          id?: never
          is_active?: boolean | null
          passing_score?: number | null
          slug?: string
          title?: string
          total_questions?: number | null
        }
        Relationships: []
      }
      pca_lessons: {
        Row: {
          content_md: string
          created_at: string | null
          difficulty: number | null
          estimated_minutes: number | null
          id: number
          is_published: boolean | null
          order_index: number | null
          prerequisite_lesson_id: number | null
          slug: string
          subject_id: number
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_md: string
          created_at?: string | null
          difficulty?: number | null
          estimated_minutes?: number | null
          id?: never
          is_published?: boolean | null
          order_index?: number | null
          prerequisite_lesson_id?: number | null
          slug: string
          subject_id: number
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_md?: string
          created_at?: string | null
          difficulty?: number | null
          estimated_minutes?: number | null
          id?: never
          is_published?: boolean | null
          order_index?: number | null
          prerequisite_lesson_id?: number | null
          slug?: string
          subject_id?: number
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pca_lessons_prerequisite_lesson_id_fkey"
            columns: ["prerequisite_lesson_id"]
            isOneToOne: false
            referencedRelation: "pca_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pca_lessons_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      pilot_state: {
        Row: {
          hours_pic: number | null
          icao_english_level: number | null
          licenses: Json | null
          stage: Database["public"]["Enums"]["pilot_stage"] | null
          target_airline: string | null
          target_date: string | null
          total_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          hours_pic?: number | null
          icao_english_level?: number | null
          licenses?: Json | null
          stage?: Database["public"]["Enums"]["pilot_stage"] | null
          target_airline?: string | null
          target_date?: string | null
          total_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          hours_pic?: number | null
          icao_english_level?: number | null
          licenses?: Json | null
          stage?: Database["public"]["Enums"]["pilot_stage"] | null
          target_airline?: string | null
          target_date?: string | null
          total_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pilot_state_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          photo_url: string | null
          referral_code: string | null
          referred_by: string | null
          username: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          photo_url?: string | null
          referral_code?: string | null
          referred_by?: string | null
          username?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          photo_url?: string | null
          referral_code?: string | null
          referred_by?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      psych_categories: {
        Row: {
          color: string | null
          description: string | null
          family: string
          icon_name: string | null
          id: number
          name: string
          order_index: number | null
          slug: string
          test_engine: string | null
        }
        Insert: {
          color?: string | null
          description?: string | null
          family: string
          icon_name?: string | null
          id?: never
          name: string
          order_index?: number | null
          slug: string
          test_engine?: string | null
        }
        Update: {
          color?: string | null
          description?: string | null
          family?: string
          icon_name?: string | null
          id?: never
          name?: string
          order_index?: number | null
          slug?: string
          test_engine?: string | null
        }
        Relationships: []
      }
      psych_group_dynamics: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          evaluation_criteria: Json | null
          id: number
          participant_count: number | null
          roles: Json | null
          scenario_description: string
          scenario_title: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          evaluation_criteria?: Json | null
          id?: never
          participant_count?: number | null
          roles?: Json | null
          scenario_description: string
          scenario_title: string
          slug: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          evaluation_criteria?: Json | null
          id?: never
          participant_count?: number | null
          roles?: Json | null
          scenario_description?: string
          scenario_title?: string
          slug?: string
        }
        Relationships: []
      }
      psych_personality_tests: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          questions: Json
          scoring_logic: Json | null
          slug: string
          test_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          questions: Json
          scoring_logic?: Json | null
          slug: string
          test_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          questions?: Json
          scoring_logic?: Json | null
          slug?: string
          test_name?: string
        }
        Relationships: []
      }
      psych_tests: {
        Row: {
          category_id: number
          config: Json
          created_at: string | null
          description: string | null
          difficulty: number | null
          duration_seconds: number | null
          id: number
          instructions: string | null
          is_active: boolean | null
          slug: string
          title: string
          type: string
        }
        Insert: {
          category_id: number
          config?: Json
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_seconds?: number | null
          id?: never
          instructions?: string | null
          is_active?: boolean | null
          slug: string
          title: string
          type: string
        }
        Update: {
          category_id?: number
          config?: Json
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          duration_seconds?: number | null
          id?: never
          instructions?: string | null
          is_active?: boolean | null
          slug?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "psych_tests_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "psych_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          difficulty: number | null
          explanation: string | null
          id: number
          modules: string[] | null
          source: string | null
          statement: string
          subject_id: number
        }
        Insert: {
          difficulty?: number | null
          explanation?: string | null
          id?: number
          modules?: string[] | null
          source?: string | null
          statement: string
          subject_id: number
        }
        Update: {
          difficulty?: number | null
          explanation?: string | null
          id?: number
          modules?: string[] | null
          source?: string | null
          statement?: string
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "questions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempt_answers: {
        Row: {
          attempt_id: number
          created_at: string
          id: number
          is_correct: boolean
          question_id: number
          selected_option_id: number | null
        }
        Insert: {
          attempt_id: number
          created_at?: string
          id?: number
          is_correct?: boolean
          question_id: number
          selected_option_id?: number | null
        }
        Update: {
          attempt_id?: number
          created_at?: string
          id?: number
          is_correct?: boolean
          question_id?: number
          selected_option_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempt_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempt_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempt_answers_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "answer_options"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          correct_answers: number
          finished_at: string | null
          id: number
          mode: Database["public"]["Enums"]["quiz_mode"]
          score: number | null
          started_at: string
          subject_id: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          correct_answers?: number
          finished_at?: string | null
          id?: number
          mode?: Database["public"]["Enums"]["quiz_mode"]
          score?: number | null
          started_at?: string
          subject_id?: number | null
          total_questions?: number
          user_id: string
        }
        Update: {
          correct_answers?: number
          finished_at?: string | null
          id?: number
          mode?: Database["public"]["Enums"]["quiz_mode"]
          score?: number | null
          started_at?: string
          subject_id?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      streaks: {
        Row: {
          current_streak: number
          last_activity_date: string | null
          longest_streak: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number
          last_activity_date?: string | null
          longest_streak?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subject_topics: {
        Row: {
          id: number
          key: string
          label: string
          order_index: number
          subject_id: number
        }
        Insert: {
          id?: number
          key: string
          label: string
          order_index?: number
          subject_id: number
        }
        Update: {
          id?: number
          key?: string
          label?: string
          order_index?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subject_topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          id: number
          name: string
          order_index: number
          slug: string
        }
        Insert: {
          id?: number
          name: string
          order_index: number
          slug: string
        }
        Update: {
          id?: number
          name?: string
          order_index?: number
          slug?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          id: number
          payment_provider_id: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          id?: number
          payment_provider_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          id?: number
          payment_provider_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: number
          seen: boolean
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: number
          seen?: boolean
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: number
          seen?: boolean
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_airline_prep_attempts: {
        Row: {
          ai_feedback_jsonb: Json | null
          answer_given: string | null
          attempted_at: string | null
          audio_recording_url: string | null
          exam_id: number | null
          flashcard_id: number | null
          id: number
          is_correct: boolean | null
          mock_id: number | null
          question_id: number | null
          time_taken_sec: number | null
          user_id: string
        }
        Insert: {
          ai_feedback_jsonb?: Json | null
          answer_given?: string | null
          attempted_at?: string | null
          audio_recording_url?: string | null
          exam_id?: number | null
          flashcard_id?: number | null
          id?: never
          is_correct?: boolean | null
          mock_id?: number | null
          question_id?: number | null
          time_taken_sec?: number | null
          user_id: string
        }
        Update: {
          ai_feedback_jsonb?: Json | null
          answer_given?: string | null
          attempted_at?: string | null
          audio_recording_url?: string | null
          exam_id?: number | null
          flashcard_id?: number | null
          id?: never
          is_correct?: boolean | null
          mock_id?: number | null
          question_id?: number | null
          time_taken_sec?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_airline_prep_attempts_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_airline_prep_attempts_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_flashcards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_airline_prep_attempts_mock_id_fkey"
            columns: ["mock_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_mocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_airline_prep_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_airline_prep_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_airline_prep_progress: {
        Row: {
          flashcards_reviewed: number | null
          last_activity_at: string | null
          mastery_level: number | null
          questions_attempted: number | null
          questions_correct: number | null
          topic_id: number
          user_id: string
        }
        Insert: {
          flashcards_reviewed?: number | null
          last_activity_at?: string | null
          mastery_level?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          topic_id: number
          user_id: string
        }
        Update: {
          flashcards_reviewed?: number | null
          last_activity_at?: string | null
          mastery_level?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          topic_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_airline_prep_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "airline_prep_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_airline_prep_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_icao_attempts: {
        Row: {
          ai_score: Json | null
          attempted_at: string | null
          audio_recording_url: string | null
          duration_seconds: number | null
          emergency_id: number | null
          exercise_id: number | null
          feedback_text: string | null
          id: number
          roleplay_id: number | null
          transcript: string | null
          user_id: string
        }
        Insert: {
          ai_score?: Json | null
          attempted_at?: string | null
          audio_recording_url?: string | null
          duration_seconds?: number | null
          emergency_id?: number | null
          exercise_id?: number | null
          feedback_text?: string | null
          id?: never
          roleplay_id?: number | null
          transcript?: string | null
          user_id: string
        }
        Update: {
          ai_score?: Json | null
          attempted_at?: string | null
          audio_recording_url?: string | null
          duration_seconds?: number | null
          emergency_id?: number | null
          exercise_id?: number | null
          feedback_text?: string | null
          id?: never
          roleplay_id?: number | null
          transcript?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_icao_attempts_emergency_id_fkey"
            columns: ["emergency_id"]
            isOneToOne: false
            referencedRelation: "icao_emergencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_icao_attempts_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "icao_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_icao_attempts_roleplay_id_fkey"
            columns: ["roleplay_id"]
            isOneToOne: false
            referencedRelation: "icao_roleplays"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_icao_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_icao_level: {
        Row: {
          current_level: number | null
          exam_scheduled_for: string | null
          last_assessment_at: string | null
          last_assessment_score: Json | null
          target_level: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_level?: number | null
          exam_scheduled_for?: string | null
          last_assessment_at?: string | null
          last_assessment_score?: Json | null
          target_level?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_level?: number | null
          exam_scheduled_for?: string | null
          last_assessment_at?: string | null
          last_assessment_score?: Json | null
          target_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_icao_level_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_icao_quiz_attempts: {
        Row: {
          answer: string
          attempted_at: string | null
          id: number
          is_correct: boolean
          question_id: number
          user_id: string
        }
        Insert: {
          answer: string
          attempted_at?: string | null
          id?: never
          is_correct: boolean
          question_id: number
          user_id: string
        }
        Update: {
          answer?: string
          attempted_at?: string | null
          id?: never
          is_correct?: boolean
          question_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_icao_quiz_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "icao_quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_icao_quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_library_bookmarks: {
        Row: {
          bookmarked_at: string | null
          item_id: number
          note: string | null
          user_id: string
        }
        Insert: {
          bookmarked_at?: string | null
          item_id: number
          note?: string | null
          user_id: string
        }
        Update: {
          bookmarked_at?: string | null
          item_id?: number
          note?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_library_bookmarks_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "library_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_library_bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_library_views: {
        Row: {
          duration_seconds: number | null
          id: number
          item_id: number
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          duration_seconds?: number | null
          id?: never
          item_id: number
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          duration_seconds?: number | null
          id?: never
          item_id?: number
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_library_views_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "library_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_library_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_pca_exam_attempts: {
        Row: {
          correct_count: number | null
          exam_id: number
          finished_at: string | null
          id: number
          passed: boolean | null
          score: number | null
          started_at: string | null
          subject_breakdown: Json | null
          time_taken_seconds: number | null
          total_questions: number | null
          user_id: string
        }
        Insert: {
          correct_count?: number | null
          exam_id: number
          finished_at?: string | null
          id?: never
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          subject_breakdown?: Json | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id: string
        }
        Update: {
          correct_count?: number | null
          exam_id?: number
          finished_at?: string | null
          id?: never
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          subject_breakdown?: Json | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_pca_exam_attempts_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "pca_exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_pca_exam_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_pca_lesson_progress: {
        Row: {
          completed_at: string | null
          lesson_id: number
          status: string | null
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          lesson_id: number
          status?: string | null
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          lesson_id?: number
          status?: string | null
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_pca_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "pca_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_pca_lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_psych_attempts: {
        Row: {
          attempted_at: string | null
          duration_seconds: number | null
          id: number
          percentile: number | null
          raw_results: Json | null
          score: number | null
          test_id: number
          user_id: string
        }
        Insert: {
          attempted_at?: string | null
          duration_seconds?: number | null
          id?: never
          percentile?: number | null
          raw_results?: Json | null
          score?: number | null
          test_id: number
          user_id: string
        }
        Update: {
          attempted_at?: string | null
          duration_seconds?: number | null
          id?: never
          percentile?: number | null
          raw_results?: Json | null
          score?: number | null
          test_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_psych_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "psych_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_psych_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vault_access_log: {
        Row: {
          access_type: string
          accessed_at: string | null
          id: number
          ip_hint: string | null
          question_id: string | null
          session_token: string | null
          user_id: string
        }
        Insert: {
          access_type: string
          accessed_at?: string | null
          id?: never
          ip_hint?: string | null
          question_id?: string | null
          session_token?: string | null
          user_id: string
        }
        Update: {
          access_type?: string
          accessed_at?: string | null
          id?: never
          ip_hint?: string | null
          question_id?: string | null
          session_token?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vault_questions: {
        Row: {
          batch_name: string | null
          correct_answer_enc: string
          created_at: string | null
          difficulty: number | null
          exam_year: number | null
          explanation_enc: string
          external_id: number | null
          id: string
          inserted_by: string | null
          is_active: boolean | null
          module: string
          options_enc: string
          pedagogical_note_enc: string | null
          question_enc: string
          source: string | null
          subject_slug: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          batch_name?: string | null
          correct_answer_enc: string
          created_at?: string | null
          difficulty?: number | null
          exam_year?: number | null
          explanation_enc: string
          external_id?: number | null
          id?: string
          inserted_by?: string | null
          is_active?: boolean | null
          module?: string
          options_enc: string
          pedagogical_note_enc?: string | null
          question_enc: string
          source?: string | null
          subject_slug: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          batch_name?: string | null
          correct_answer_enc?: string
          created_at?: string | null
          difficulty?: number | null
          exam_year?: number | null
          explanation_enc?: string
          external_id?: number | null
          id?: string
          inserted_by?: string | null
          is_active?: boolean | null
          module?: string
          options_enc?: string
          pedagogical_note_enc?: string | null
          question_enc?: string
          source?: string | null
          subject_slug?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vault_questions_inserted_by_fkey"
            columns: ["inserted_by"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vault_sessions: {
        Row: {
          answers_given: string[] | null
          completed_at: string | null
          correct_count: number | null
          expires_at: string | null
          module: string | null
          question_ids: string[]
          started_at: string | null
          subject_slug: string | null
          token: string
          user_id: string
        }
        Insert: {
          answers_given?: string[] | null
          completed_at?: string | null
          correct_count?: number | null
          expires_at?: string | null
          module?: string | null
          question_ids: string[]
          started_at?: string | null
          subject_slug?: string | null
          token?: string
          user_id: string
        }
        Update: {
          answers_given?: string[] | null
          completed_at?: string | null
          correct_count?: number | null
          expires_at?: string | null
          module?: string | null
          question_ids?: string[]
          started_at?: string | null
          subject_slug?: string | null
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vault_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_pca_readiness"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      user_pca_readiness: {
        Row: {
          attempts_60d: number | null
          avg_score_60d: number | null
          best_score: number | null
          passed_recently: boolean | null
          readiness_color: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _gen_referral_code: { Args: never; Returns: string }
      _try_unlock: {
        Args: { p_code: string; p_user_id: string }
        Returns: number
      }
      ai_usage_this_month: { Args: never; Returns: number }
      check_and_unlock_achievements: {
        Args: { p_user_id: string }
        Returns: number
      }
      check_my_expiries: { Args: never; Returns: number }
      check_username_available: {
        Args: { p_username: string }
        Returns: boolean
      }
      get_activity_heatmap: {
        Args: never
        Returns: {
          activities_count: number
          date: string
          questions_answered: number
        }[]
      }
      get_all_subjects_intel: {
        Args: never
        Returns: {
          hottest_topic: string
          pass_rate: number
          subject_id: number
          subject_name: string
          subject_slug: string
          total_reports: number
        }[]
      }
      get_daily_quiz: {
        Args: never
        Returns: {
          explanation: string
          options: Json
          question_id: number
          statement: string
          subject_id: number
          subject_name: string
        }[]
      }
      get_peers_in_stage: {
        Args: { p_limit?: number }
        Returns: {
          current_streak: number
          stage: string
          user_id: string
          username: string
        }[]
      }
      get_profile_avatars: {
        Args: { p_user_ids: string[] }
        Returns: {
          id: string
          photo_url: string
          username: string
        }[]
      }
      get_referral_stats: {
        Args: never
        Returns: {
          active_referred: number
          my_code: string
          total_referred: number
        }[]
      }
      get_subject_intel: {
        Args: { p_subject_slug: string }
        Returns: {
          avg_difficulty: number
          pass_rate: number
          recent_reports: Json
          subject_id: number
          subject_name: string
          top_topics: Json
          total_reports: number
        }[]
      }
      get_subject_mastery: {
        Args: never
        Returns: {
          attempts_count: number
          avg_score: number
          mastery_level: string
          subject_id: number
          subject_name: string
          subject_slug: string
          total_attempted: number
          total_questions: number
        }[]
      }
      increment_streak: { Args: never; Returns: undefined }
      mark_all_notifications_read: { Args: never; Returns: number }
      recalc_pilot_hours: { Args: { p_user_id: string }; Returns: undefined }
      record_daily_activity: {
        Args: { p_correct?: number; p_minutes?: number; p_questions?: number }
        Returns: undefined
      }
      unread_notifications_count: { Args: never; Returns: number }
      vault_cleanup_expired_sessions: { Args: never; Returns: number }
      vault_insert: {
        Args: {
          p_batch_name?: string
          p_correct_answer: string
          p_difficulty?: number
          p_exam_year?: number
          p_explanation: string
          p_external_id?: number
          p_module: string
          p_options: Json
          p_pedagogical_note?: string
          p_question: string
          p_source?: string
          p_subject_slug: string
          p_tags?: string[]
        }
        Returns: string
      }
      vault_list_subjects: {
        Args: { p_module?: string }
        Returns: {
          question_count: number
          subject_slug: string
        }[]
      }
      vault_start_quiz: {
        Args: {
          p_count?: number
          p_difficulty?: number
          p_module?: string
          p_subject_slug?: string
        }
        Returns: {
          expires_at: string
          question_count: number
          questions: Json
          token: string
        }[]
      }
      vault_submit_answer: {
        Args: { p_answer: string; p_position: number; p_token: string }
        Returns: {
          correct_answer: string
          explanation: string
          is_correct: boolean
          pedagogical_note: string
          questions_remaining: number
        }[]
      }
    }
    Enums: {
      aerocivil_region:
        | "bogota"
        | "medellin"
        | "cali"
        | "barranquilla"
        | "cartagena"
        | "cucuta"
        | "pereira"
        | "bucaramanga"
        | "otra"
      channel_type: "general" | "stage" | "subject" | "airline"
      license_type:
        | "medical_class_1"
        | "medical_class_2"
        | "medical_class_3"
        | "ppl"
        | "cpl"
        | "atpl"
        | "ifr"
        | "multi_engine"
        | "flight_instructor"
        | "type_rating"
        | "icao_english"
        | "recurrent_check"
        | "other"
      notification_type:
        | "achievement"
        | "streak_at_risk"
        | "milestone_close"
        | "expiry_warning"
        | "community_mention"
        | "wingman_insight"
      pilot_stage:
        | "student_ppl"
        | "ppl"
        | "cpl_in_progress"
        | "cpl_ready"
        | "hour_building"
        | "airline_candidate"
        | "instructor"
      quiz_mode: "practice" | "simulacrum"
      subscription_plan:
        | "free"
        | "pro_monthly"
        | "pro_annual"
        | "founder_lifetime"
        | "pro_plus_monthly"
        | "pro_plus_annual"
      subscription_status: "trialing" | "active" | "past_due" | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      aerocivil_region: [
        "bogota",
        "medellin",
        "cali",
        "barranquilla",
        "cartagena",
        "cucuta",
        "pereira",
        "bucaramanga",
        "otra",
      ],
      channel_type: ["general", "stage", "subject", "airline"],
      license_type: [
        "medical_class_1",
        "medical_class_2",
        "medical_class_3",
        "ppl",
        "cpl",
        "atpl",
        "ifr",
        "multi_engine",
        "flight_instructor",
        "type_rating",
        "icao_english",
        "recurrent_check",
        "other",
      ],
      notification_type: [
        "achievement",
        "streak_at_risk",
        "milestone_close",
        "expiry_warning",
        "community_mention",
        "wingman_insight",
      ],
      pilot_stage: [
        "student_ppl",
        "ppl",
        "cpl_in_progress",
        "cpl_ready",
        "hour_building",
        "airline_candidate",
        "instructor",
      ],
      quiz_mode: ["practice", "simulacrum"],
      subscription_plan: [
        "free",
        "pro_monthly",
        "pro_annual",
        "founder_lifetime",
        "pro_plus_monthly",
        "pro_plus_annual",
      ],
      subscription_status: ["trialing", "active", "past_due", "canceled"],
    },
  },
} as const
