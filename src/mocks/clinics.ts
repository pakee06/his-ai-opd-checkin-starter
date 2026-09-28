/*
 * Synthetic clinic list for US-001 (AC8). Fixed values only — no service, no real clinic data.
 * `gen-med` is the id the capstone brief binds to "GEN"; do not rename it.
 */
export type Clinic = {
  id: string;
  name: string;
};

export const clinics: Clinic[] = [
  { id: 'gen-med', name: 'General Medicine' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'orthopedics', name: 'Orthopedics' },
];
