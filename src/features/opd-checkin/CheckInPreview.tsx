'use client';

import type { Clinic } from '@/mocks/clinics';
import type { Patient } from '@/mocks/patients';
import type { CheckInFormValues } from './CheckInForm';
import { EMPTY_VALUE, focusRing, formatDateOfBirth, formatFullName, genderLabel } from './patient-display';

/*
 * CheckInPreview — US-001 AC10 (review before confirming) and AC11 (go back to edit).
 * Standalone component: props in, callbacks out. Calls no service and is not wired into any page yet.
 * Styling uses only Suth tokens from DESIGN.md (declared in src/app/globals.css).
 */

export type CheckInPreviewProps = {
  /** The patient chosen in PatientSearch. */
  patient: Patient;
  /** Same clinic list given to CheckInForm — used to show the chosen clinic's name. */
  clinics: Clinic[];
  /** Values sent by CheckInForm's onContinue. */
  values: CheckInFormValues;
  /** Go back to CheckInForm to edit (AC11). The parent keeps `values` and passes them back as initialValues. */
  onBack: () => void;
  /** Staff confirms the check-in (AC10). */
  onConfirm: () => void;
};

/** Shown when Chief Complaint was left blank (AC9) — decision agreed in review. */
const NOT_SPECIFIED = 'ไม่ได้ระบุ';

export function CheckInPreview({ patient, clinics, values, onBack, onConfirm }: CheckInPreviewProps) {
  const clinic = clinics.find((item) => item.id === values.clinicId);
  const chiefComplaint = values.chiefComplaint.trim();

  const patientRows: { label: string; value: string }[] = [
    { label: 'HN', value: patient.hn || EMPTY_VALUE },
    { label: 'ชื่อ-นามสกุล', value: formatFullName(patient) },
    { label: 'วันเกิด (ค.ศ.)', value: formatDateOfBirth(patient.dateOfBirth) },
    { label: 'เพศ', value: genderLabel[patient.gender] ?? EMPTY_VALUE },
  ];

  return (
    <section
      aria-labelledby="check-in-preview-title"
      className="flex w-full min-w-0 flex-col gap-(--spacing-form-column-gap) rounded-card bg-surface-card p-(--spacing-form-column-gap) font-body text-text-base shadow-card"
    >
      <div className="flex min-w-0 flex-col gap-(--spacing-sm)">
        <h2 id="check-in-preview-title" className="text-card-header font-semibold text-text-title">
          ตรวจสอบข้อมูลก่อนยืนยัน
        </h2>
        <p className="text-card-header-sm text-text-mid">ยังไม่ได้ลงทะเบียน — ตรวจสอบให้ถูกต้องแล้วกดยืนยัน</p>
      </div>

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

      <dl aria-label="ข้อมูลการลงทะเบียน" className="flex min-w-0 flex-col gap-(--spacing-form-row-gap)">
        <div className="flex min-w-0 flex-col gap-(--spacing-sm)">
          <dt className="text-card-header-sm text-text-mid">คลินิก</dt>
          <dd className="font-semibold text-text-base wrap-anywhere">{clinic?.name ?? (values.clinicId || EMPTY_VALUE)}</dd>
        </div>
        <div className="flex min-w-0 flex-col gap-(--spacing-sm)">
          <dt className="text-card-header-sm text-text-mid">อาการเบื้องต้น (Chief Complaint)</dt>
          {chiefComplaint ? (
            <dd className="whitespace-pre-wrap text-text-base wrap-anywhere">{values.chiefComplaint}</dd>
          ) : (
            <dd className="text-text-mid">{NOT_SPECIFIED}</dd>
          )}
        </div>
      </dl>

      <div className="flex min-w-0 flex-col gap-(--spacing-form-row-gap) sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className={`w-full rounded-btn border border-primary-default bg-surface-card px-(--spacing-form-column-gap) py-(--spacing-main) text-button font-semibold text-primary-default hover:border-primary-hover hover:text-primary-hover sm:flex-1 ${focusRing}`}
        >
          ย้อนกลับไปแก้ไข
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`w-full rounded-btn bg-button-primary px-(--spacing-form-column-gap) py-(--spacing-main) text-button font-semibold text-on-primary hover:bg-primary-hover sm:flex-1 ${focusRing}`}
        >
          ยืนยันการลงทะเบียน
        </button>
      </div>
    </section>
  );
}
