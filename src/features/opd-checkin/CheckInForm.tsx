'use client';

import { useRef, useState, type FormEvent } from 'react';
import type { Clinic } from '@/mocks/clinics';
import type { Patient } from '@/mocks/patients';
import { EMPTY_VALUE, focusRing, formatDateOfBirth, formatFullName, genderLabel } from './patient-display';

/*
 * CheckInForm — US-001 AC7 (selected patient), AC8 (Clinic required), AC9 (Chief Complaint optional),
 * AC11 (values kept when coming back from Preview via initialValues).
 * Standalone component: props in, callback out. Calls no service and is not wired into any page yet.
 * Styling uses only Suth tokens from DESIGN.md (declared in src/app/globals.css).
 */

export type CheckInFormValues = {
  /** id of the chosen clinic from the `clinics` prop. */
  clinicId: string;
  /** Free text exactly as typed. Empty string when left blank (AC9). */
  chiefComplaint: string;
};

export type CheckInFormProps = {
  /** The patient chosen in PatientSearch — shown read-only (AC7). */
  patient: Patient;
  /** Clinics staff can choose from. */
  clinics: Clinic[];
  /** Values to restore when staff returns from Preview (AC11). Omit for a fresh form. */
  initialValues?: Partial<CheckInFormValues>;
  /** Called only when a Clinic is selected (AC8). */
  onContinue: (values: CheckInFormValues) => void;
};

export function CheckInForm({ patient, clinics, initialValues, onContinue }: CheckInFormProps) {
  const [clinicId, setClinicId] = useState(initialValues?.clinicId ?? '');
  const [chiefComplaint, setChiefComplaint] = useState(initialValues?.chiefComplaint ?? '');
  const [showClinicError, setShowClinicError] = useState(false);
  const clinicSelectRef = useRef<HTMLSelectElement>(null);

  const clinicInvalid = showClinicError && !clinicId;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!clinicId) {
      setShowClinicError(true); // AC8: block and explain
      clinicSelectRef.current?.focus();
      return;
    }
    onContinue({ clinicId, chiefComplaint });
  }

  const patientRows: { label: string; value: string }[] = [
    { label: 'HN', value: patient.hn || EMPTY_VALUE },
    { label: 'ชื่อ-นามสกุล', value: formatFullName(patient) },
    { label: 'วันเกิด (ค.ศ.)', value: formatDateOfBirth(patient.dateOfBirth) },
    { label: 'เพศ', value: genderLabel[patient.gender] ?? EMPTY_VALUE },
  ];

  return (
    <section
      aria-labelledby="check-in-form-title"
      className="flex w-full min-w-0 flex-col gap-(--spacing-form-column-gap) rounded-card bg-surface-card p-(--spacing-form-column-gap) font-body text-text-base shadow-card"
    >
      <h2 id="check-in-form-title" className="text-card-header font-semibold text-text-title">
        ลงทะเบียนเข้ารับบริการ
      </h2>

      <div className="flex min-w-0 flex-col gap-(--spacing-md) rounded-card border border-input-border bg-theme-background p-(--spacing-main)">
        <h3 className="text-card-header-sm font-semibold text-text-mid">ผู้ป่วยที่เลือก</h3>
        <dl aria-label="ข้อมูลผู้ป่วยที่เลือก" className="flex min-w-0 flex-col gap-(--spacing-sm)">
          {patientRows.map((row) => (
            <div key={row.label} className="flex min-w-0 flex-wrap justify-between gap-x-(--spacing-form-column-gap)">
              <dt className="text-card-header-sm text-text-mid">{row.label}</dt>
              <dd className="min-w-0 text-right font-semibold text-text-base wrap-anywhere">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-(--spacing-form-column-gap)">
        <div className="flex min-w-0 flex-col gap-(--spacing-form-row-gap)">
          <label htmlFor="check-in-clinic" className="text-card-header-sm font-semibold text-text-base">
            คลินิก{' '}
            <span aria-hidden="true" className="text-danger-default">
              *
            </span>
            <span className="sr-only">(จำเป็น)</span>
          </label>
          <select
            id="check-in-clinic"
            ref={clinicSelectRef}
            value={clinicId}
            onChange={(event) => setClinicId(event.target.value)}
            aria-required="true"
            aria-invalid={clinicInvalid}
            aria-describedby={clinicInvalid ? 'check-in-clinic-error' : undefined}
            className={`w-full min-w-0 rounded-input border bg-surface-card px-(--spacing-main) py-(--spacing-md) text-text-base ${focusRing} ${
              clinicInvalid
                ? 'border-danger-default'
                : 'border-input-border hover:border-input-border-hover focus-visible:border-input-border-focus'
            }`}
          >
            <option value="">— เลือกคลินิก —</option>
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>
                {clinic.name}
              </option>
            ))}
          </select>
          {clinicInvalid && (
            <p
              id="check-in-clinic-error"
              role="alert"
              className="rounded-card border border-danger-default bg-danger-faded px-(--spacing-main) py-(--spacing-md) text-card-header-sm font-semibold text-text-base"
            >
              กรุณาเลือกคลินิกก่อนไปขั้นตอนตรวจสอบข้อมูล
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-(--spacing-form-row-gap)">
          <label htmlFor="check-in-chief-complaint" className="text-card-header-sm font-semibold text-text-base">
            อาการเบื้องต้น (Chief Complaint) <span className="font-normal text-text-mid">(ไม่บังคับ)</span>
          </label>
          <textarea
            id="check-in-chief-complaint"
            value={chiefComplaint}
            onChange={(event) => setChiefComplaint(event.target.value)}
            rows={3}
            placeholder="เช่น ปวดศีรษะ 2 วัน"
            className={`w-full min-w-0 resize-y rounded-input border border-input-border bg-surface-card px-(--spacing-main) py-(--spacing-md) text-text-base hover:border-input-border-hover focus-visible:border-input-border-focus ${focusRing}`}
          />
        </div>

        <button
          type="submit"
          className={`w-full rounded-btn bg-button-primary px-(--spacing-form-column-gap) py-(--spacing-main) text-button font-semibold text-on-primary hover:bg-primary-hover ${focusRing}`}
        >
          ไปต่อ: ตรวจสอบข้อมูล
        </button>
      </form>
    </section>
  );
}
