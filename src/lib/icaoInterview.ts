/**
 * TEA — Part 1: Interview.
 *
 * Banco de preguntas que el examinador hace en la Parte 1 del Test of English
 * for Aviation (Mayflower College). El candidato debe responder de forma
 * técnica, profesional y espontánea, en inglés natural y con high register words.
 *
 * Cada pregunta trae una RESPUESTA SUGERIDA como modelo (no para memorizar al
 * pie de la letra — el examen penaliza respuestas claramente memorizadas — sino
 * para entender el registro, la estructura y el vocabulario esperado).
 *
 * PENDIENTE: `highRegisterWords` — palabras/expresiones de alto registro a
 * resaltar por pregunta. El usuario las va a cargar después (ver memoria
 * `aviatory-tea-high-register-pendiente`). Por ahora quedan como [].
 */

export interface InterviewQuestion {
  /** número dentro del set (1-8) */
  n: number
  question: string
  /** respuesta modelo: técnica, profesional, espontánea */
  suggestedAnswer: string
  /** PENDIENTE: high register words a resaltar (las carga el usuario después) */
  highRegisterWords?: string[]
}

export interface InterviewSet {
  set: number
  label: string
  questions: InterviewQuestion[]
}

export const TEA_PART1_SETS: InterviewSet[] = [
  {
    set: 1,
    label: "Set One",
    questions: [
      {
        n: 1,
        question: "What is your job?",
        suggestedAnswer:
          "I'm a commercial pilot. I operate a narrow-body jet on both domestic and international routes. My main responsibility is to fly the aircraft safely from departure to destination, but the role goes well beyond just handling the controls — I'm also responsible for flight planning, fuel decisions, coordinating with my crew, and making sure every phase of the flight complies with our standard operating procedures.",
        highRegisterWords: ["commercial pilot", "narrow-body jet", "standard operating procedures (SOPs)", "comply with", "flight planning", "domestic and international routes"],
      },
      {
        n: 2,
        question: "What do you like about your job?",
        suggestedAnswer:
          "What I enjoy most is that no two days are ever the same. The weather, the route, the traffic and the passengers all change, so I'm constantly solving new problems. I also really value the responsibility — knowing that hundreds of people trust me to get them home safely is demanding, but that's exactly what makes the job meaningful to me.",
        highRegisterWords: ["no two days are the same", "solving new problems", "value the responsibility", "demanding", "meaningful"],
      },
      {
        n: 3,
        question: "Do you find your job stressful? (why?)",
        suggestedAnswer:
          "It can be, yes, particularly during high-workload phases like an approach in poor weather, or when something unexpected happens such as a technical failure or a medical emergency on board. The pressure is real because the decisions have consequences. But our training is designed precisely to manage that — we follow checklists, we share the workload and we rely on solid crew resource management, so the stress stays controlled rather than overwhelming.",
        highRegisterWords: ["high-workload phases", "crew resource management (CRM)", "technical failure", "medical emergency", "manage the workload"],
      },
      {
        n: 4,
        question: "What's the best thing about your job?",
        suggestedAnswer:
          "For me, the best part is the sense of accomplishment at the end of a challenging flight — when you've dealt with difficult weather or a tight schedule and you still bring the aircraft in smoothly and on time. There's also the privilege of the view from the flight deck; even after years of flying, a sunrise above the clouds never gets old.",
        highRegisterWords: ["a sense of accomplishment", "a challenging flight", "a tight schedule", "the privilege of", "flight deck"],
      },
      {
        n: 5,
        question: "And what's the worst thing?",
        suggestedAnswer:
          "The most difficult aspect is the lifestyle. The irregular rosters, the early starts, the time zones and the nights away from home can be tiring, and they take a toll on family life. Fatigue management is a constant challenge, so you have to be very disciplined about rest and recovery.",
        highRegisterWords: ["irregular rosters", "take a toll on", "fatigue management", "disciplined", "rest and recovery"],
      },
      {
        n: 6,
        question: "When did you first decide you wanted to be a pilot or controller?",
        suggestedAnswer:
          "I knew quite early — I was around twelve when I took my first flight, and I remember being fascinated by how something so big could leave the ground so smoothly. From that moment the idea never really left me, and as I grew older I became more and more committed to turning it into a career.",
        highRegisterWords: ["fascinated by", "committed", "turn it into a career"],
      },
      {
        n: 7,
        question: "What are your future plans?",
        suggestedAnswer:
          "In the short term, I want to keep building experience and flight hours, and eventually upgrade to captain. Longer term, I'd like to move onto wide-body, long-haul operations, and perhaps become a training captain so I can pass on what I've learned to the next generation of pilots.",
        highRegisterWords: ["build flight hours", "upgrade to captain", "wide-body, long-haul operations", "training captain", "the next generation of pilots"],
      },
      {
        n: 8,
        question: "What would make your job better?",
        suggestedAnswer:
          "Honestly, a more predictable roster would make a big difference — better scheduling means better rest and a healthier work-life balance. Beyond that, continued investment in modern aircraft and technology always helps, because newer systems reduce workload and improve safety margins.",
        highRegisterWords: ["a more predictable roster", "work-life balance", "reduce workload", "improve safety margins"],
      },
    ],
  },
  {
    set: 2,
    label: "Set Two",
    questions: [
      {
        n: 1,
        question: "Describe your role as a pilot or controller.",
        suggestedAnswer:
          "As a pilot, my role is to operate the aircraft safely and efficiently while managing everything that happens around it. That includes preparing the flight plan, calculating fuel and performance, conducting the pre-flight inspection, flying the aircraft through every phase, and coordinating constantly with air traffic control and my crew. Above all, I'm the final decision-maker responsible for the safety of everyone on board.",
        highRegisterWords: ["operate safely and efficiently", "fuel and performance", "pre-flight inspection", "coordinating with ATC", "the final decision-maker", "safety of everyone on board"],
      },
      {
        n: 2,
        question: "Is a pilot's or controller's job important? (why?)",
        suggestedAnswer:
          "Absolutely. We're directly responsible for human lives — hundreds of people on every flight — so the margin for error is extremely small. Beyond safety, aviation connects the world; it moves people, trade and goods across continents. Without competent pilots and controllers, the whole system simply couldn't function safely.",
        highRegisterWords: ["responsible for human lives", "the margin for error", "connects the world", "trade and goods", "competent"],
      },
      {
        n: 3,
        question: "Do you like your job? (why?)",
        suggestedAnswer:
          "I do, very much. It combines so many things I value: technical skill, decision-making, teamwork and responsibility. It's also a job that never lets you become complacent — you're always learning, always being assessed — and that keeps me engaged and motivated.",
        highRegisterWords: ["decision-making", "teamwork", "become complacent", "engaged and motivated", "constantly assessed"],
      },
      {
        n: 4,
        question: "What role do computers have in a pilot's or controller's job?",
        suggestedAnswer:
          "A huge one. Modern aircraft are highly automated — the flight management system, the autopilot and the autothrottle handle a great deal of the routine workload, which lets us focus on monitoring and decision-making. That said, automation is a tool, not a replacement. We have to understand exactly what the systems are doing and be ready to take manual control the moment something doesn't behave as expected.",
        highRegisterWords: ["highly automated", "flight management system (FMS)", "autopilot and autothrottle", "routine workload", "monitoring", "take manual control"],
      },
      {
        n: 5,
        question: "Are routines important in a pilot's or controller's job? (why?)",
        suggestedAnswer:
          "They're essential. Standard operating procedures and checklists exist so that every pilot does things the same correct way, every single time. Routines reduce the chance of human error, they make crew coordination predictable, and in an emergency they free up mental capacity because the basics are already automatic. Discipline in following routines is one of the foundations of safety.",
        highRegisterWords: ["standard operating procedures", "checklists", "reduce human error", "crew coordination", "free up mental capacity", "the foundations of safety"],
      },
      {
        n: 6,
        question:
          "What's the difference between a pilot's or controller's role today, compared with the past?",
        suggestedAnswer:
          "The biggest change is technology and automation. In the past, flying was much more manual and demanded constant hands-on attention. Today the systems manage a lot of the workload, so the role has shifted towards systems management, monitoring and decision-making. The emphasis on crew resource management and human factors is also far greater now than it used to be.",
        highRegisterWords: ["technology and automation", "hands-on", "systems management", "human factors", "crew resource management"],
      },
      {
        n: 7,
        question: "How could your job change in the future?",
        suggestedAnswer:
          "I think automation will continue to advance, and aircraft will become even more connected and data-driven. There's a lot of discussion about single-pilot operations and even remote or autonomous flight, although I believe a qualified human in the loop will remain essential for safety for a long time. We'll probably need to become even more skilled at managing complex systems.",
        highRegisterWords: ["data-driven", "single-pilot operations", "autonomous flight", "a human in the loop", "managing complex systems"],
      },
      {
        n: 8,
        question: "What's the most difficult thing about your job?",
        suggestedAnswer:
          "Managing the unexpected. You can plan everything perfectly, but weather, a technical issue or a sick passenger can change the situation in seconds. The challenge is staying calm, prioritising correctly and making a sound decision quickly, often with incomplete information.",
        highRegisterWords: ["managing the unexpected", "staying calm", "prioritising correctly", "a sound decision", "incomplete information"],
      },
    ],
  },
  {
    set: 3,
    label: "Set Three",
    questions: [
      {
        n: 1,
        question: "What does a pilot or controller do?",
        suggestedAnswer:
          "A pilot's job is to operate the aircraft safely from origin to destination. That covers planning the flight, checking the aircraft and the weather, flying through every phase from take-off to landing, communicating with air traffic control, and managing any problem that arises along the way. A controller, on the other hand, manages the flow of traffic and keeps aircraft safely separated.",
        highRegisterWords: ["operate the aircraft safely", "every phase of flight", "communicating with ATC", "the flow of traffic", "safely separated"],
      },
      {
        n: 2,
        question: "What do you like about your job?",
        suggestedAnswer:
          "I love the variety and the challenge. Every flight is a fresh set of conditions, and I enjoy the problem-solving that comes with that. There's also a real sense of pride in doing a demanding job to a high standard, knowing that people depend on it.",
        highRegisterWords: ["variety and challenge", "problem-solving", "a sense of pride", "to a high standard"],
      },
      {
        n: 3,
        question: "What type of decisions does a pilot have to make?",
        suggestedAnswer:
          "All kinds — some routine, some critical. Routine ones include how much fuel to carry, which runway to expect, or when to start the descent. Critical ones might be whether to divert because of weather, whether to reject a take-off, or how to handle a technical failure. The key is that the safety of the flight always comes first, ahead of schedule or commercial pressure.",
        highRegisterWords: ["routine and critical decisions", "divert", "reject a take-off", "technical failure", "ahead of commercial pressure"],
      },
      {
        n: 4,
        question: "What is the best thing about being a pilot?",
        suggestedAnswer:
          "The combination of responsibility and freedom. You're in charge of a complex machine and the lives on board, which is hugely rewarding, and at the same time you get a view of the world that very few people ever see. Completing a difficult flight well is a feeling that's hard to match.",
        highRegisterWords: ["responsibility and freedom", "a complex machine", "hugely rewarding"],
      },
      {
        n: 5,
        question: "Did you ever have any doubts about becoming a pilot?",
        suggestedAnswer:
          "There were moments during training that were genuinely tough — the workload is heavy and the exams are demanding, so naturally you question whether you'll make it. But those doubts never lasted. Every time I got back in the aircraft, I remembered exactly why I'd chosen this path, and that kept me going.",
        highRegisterWords: ["a heavy workload", "demanding exams", "chosen this path", "kept me going"],
      },
      {
        n: 6,
        question: "How did you become interested in aviation?",
        suggestedAnswer:
          "It started in childhood. My first trip on an airliner sparked it, and from there I read everything I could about aircraft. The fascination just grew — how they're built, how they fly, how the whole system works together — until it became clear this was what I wanted to do with my life.",
        highRegisterWords: ["sparked my interest", "fascination", "how the whole system works together"],
      },
      {
        n: 7,
        question: "What do you do to maintain your health?",
        suggestedAnswer:
          "Health is part of the job — we can't fly without a valid medical certificate, so I take it seriously. I exercise regularly, I try to eat well even when I'm away, and I'm strict about rest, because fatigue is a real safety issue in this profession. Managing sleep around irregular rosters is probably the most important part.",
        highRegisterWords: ["a valid medical certificate", "strict about rest", "fatigue is a real safety issue", "irregular rosters"],
      },
      {
        n: 8,
        question: "What is the most difficult part of your job?",
        suggestedAnswer:
          "Dealing with the unexpected under time pressure. When something abnormal happens — a system warning, deteriorating weather, a medical case — you have to assess it quickly, follow the right procedures and make a decision, all while still flying the aircraft. Staying calm and methodical in those moments is the hardest and most important skill.",
        highRegisterWords: ["dealing with the unexpected", "under time pressure", "an abnormal situation", "follow the right procedures", "calm and methodical"],
      },
    ],
  },
  {
    set: 4,
    label: "Set Four",
    questions: [
      {
        n: 1,
        question: "What is your job?",
        suggestedAnswer:
          "I'm a professional pilot. I operate a commercial jet on scheduled passenger flights, and my core responsibility is the safety and efficiency of every operation — from the planning on the ground to the moment the passengers disembark at the destination.",
        highRegisterWords: ["a professional pilot", "scheduled passenger flights", "safety and efficiency", "disembark"],
      },
      {
        n: 2,
        question: "Why did you choose to be a pilot or controller?",
        suggestedAnswer:
          "Because it brings together everything I'm passionate about — aviation, technical challenge, responsibility and teamwork. I wanted a career that would never be routine or boring, one that constantly pushes me to be better. Flying gives me exactly that, along with the privilege of doing something genuinely important.",
        highRegisterWords: ["passionate about", "technical challenge", "never routine", "a privilege", "genuinely important"],
      },
      {
        n: 3,
        question: "What do you like about your job?",
        suggestedAnswer:
          "The responsibility and the variety, mainly. Every day brings different conditions and different challenges, so I never stop learning. And I find real satisfaction in handling a demanding situation well and delivering my passengers safely.",
        highRegisterWords: ["responsibility and variety", "never stop learning", "real satisfaction", "deliver my passengers safely"],
      },
      {
        n: 4,
        question: "Is there anything you don't like about your job?",
        suggestedAnswer:
          "The main downside is the impact on personal life — the unsocial hours, being away from home, and the constant battle against fatigue. It's the price you pay for the job, and you learn to manage it, but I'd be lying if I said it was easy.",
        highRegisterWords: ["the main downside", "unsocial hours", "the battle against fatigue", "learn to manage it"],
      },
      {
        n: 5,
        question: "Was the training to be a pilot or controller hard? (Why? Why not?)",
        suggestedAnswer:
          "Yes, it was genuinely demanding. There's an enormous amount of theory to master — meteorology, navigation, systems, regulations — alongside the practical flying skills, and you're assessed continuously. It pushes you hard, both intellectually and mentally. But that difficulty is necessary; it's what makes sure that everyone in the flight deck truly deserves to be there.",
        highRegisterWords: ["genuinely demanding", "meteorology, navigation, systems, regulations", "assessed continuously", "intellectually and mentally", "deserve to be there"],
      },
      {
        n: 6,
        question: "What aircraft would you most like to fly? (Why? Why not?)",
        suggestedAnswer:
          "I'd love to fly the Boeing 787 or the Airbus A350 one day. They're modern, efficient long-haul aircraft with advanced flight decks and beautiful systems, and they operate the kind of intercontinental routes I find most rewarding. The idea of flying long-haul to the other side of the world really appeals to me.",
        highRegisterWords: ["modern, long-haul aircraft", "advanced flight decks", "intercontinental routes", "rewarding"],
      },
      {
        n: 7,
        question: "What is a typical day as a pilot or controller?",
        suggestedAnswer:
          "It starts well before the flight, with checking the weather, the flight plan, the fuel and any technical notes about the aircraft. Then there's the crew briefing, the walk-around inspection and the cockpit set-up. Once airborne, we manage the flight phase by phase, communicating with ATC throughout, and after landing we complete the post-flight paperwork. If it's a multi-sector day, we reset and do it all again.",
        highRegisterWords: ["crew briefing", "walk-around inspection", "cockpit set-up", "phase by phase", "post-flight paperwork", "a multi-sector day"],
      },
      {
        n: 8,
        question: "Are there any things you would like to change about your job?",
        suggestedAnswer:
          "I'd improve the rostering and the predictability of the schedule, because that's what affects quality of life the most. I'd also always welcome more investment in training and in newer technology, since both make the operation safer and the job more enjoyable.",
        highRegisterWords: ["rostering", "predictability of the schedule", "quality of life", "investment in training"],
      },
    ],
  },
]

export const TEA_PART1_TOTAL = TEA_PART1_SETS.reduce(
  (acc, s) => acc + s.questions.length,
  0,
)
