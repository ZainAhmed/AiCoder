export const APP_NAME = "Brify";

export const INPUT_PROMPT = `You are a senior React developer. Convert this UI screenshot into production-ready React code.

REQUIREMENTS:
- React functional components with hooks
- Tailwind CSS only
- Responsive design (mobile-first: sm:, md:, lg:)
- Semantic HTML with accessibility (aria-labels, alt)
- Descriptive camelCase variable names
- Hover/focus states for interactive elements
- Realistic placeholder data
- Export default

CODE STRUCTURE:
- Destructure props in signature
- useState for local state
- Arrow functions for handlers
- Group related logic
- Max 150 lines

STYLING:
- Consistent spacing (p-4, m-6, gap-3)
- Tailwind color palette
- Smooth transitions (transition-all duration-200)

DO NOT:
- Inline styles or CSS modules
- Import external packages (except React)
- Class components
- TODOs or console.logs

Return ONLY complete JS code, no explanations.
`;
