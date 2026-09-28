import type { Patient } from '@/mocks/patients';

/*
 * Display helpers shared by CheckInForm / CheckInPreview (AC7, AC10).
 * Same rules as PatientSearch (which keeps its own copy and is intentionally left unchanged).
 */

export const EMPTY_VALUE = '—';

export const genderLabel: Record<Patient['gender'], string> = {
  male: 'ชาย',
  female: 'หญิง',
  other: 'อื่น ๆ',
};

/** Mock records store ISO dates (YYYY-MM-DD). Show DD/MM/YYYY (ค.ศ.) without timezone conversion. */
export function formatDateOfBirth(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate || EMPTY_VALUE;
  return `${day}/${month}/${year}`;
}

export function formatFullName(patient: Patient): string {
  return `${patient.firstName} ${patient.lastName}`.trim() || EMPTY_VALUE;
}

export const focusRing =
  'focus-visible:outline focus-visible:outline-offset-(--spacing-sm) focus-visible:outline-input-border-focus';
