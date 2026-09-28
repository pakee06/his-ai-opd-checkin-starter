'use client';

import { useRef, useState, type FormEvent } from 'react';
import type { Patient } from '@/mocks/patients';
import { searchPatients } from '@/services/patient-service';

/*
 * PatientSearch — US-001 AC1–AC7 (search, loading, empty, error + retry, pick one patient).
 * Standalone component: not wired into any page yet.
 * Styling uses only Suth tokens from DESIGN.md (declared in src/app/globals.css).
 */

export type SearchPatientsFn = (query: string) => Promise<Patient[]>;

export type PatientSearchProps = {
  /** Called with the full mock patient record when staff picks one result. */
  onSelectPatient: (patient: Patient) => void;
  /** Search function to call. Defaults to the mock service in src/services; Storybook injects a fixed scenario. */
  searchFn?: SearchPatientsFn;
};

type SearchState =
  | { status: 'idle' }
  | { status: 'invalid' }
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error' }
  | { status: 'results'; patients: Patient[] };

const genderLabel: Record<Patient['gender'], string> = {
  male: 'ชาย',
  female: 'หญิง',
  other: 'อื่น ๆ',
};

const EMPTY_VALUE = '—';

/** Mock records store ISO dates (YYYY-MM-DD). Show DD/MM/YYYY (ค.ศ.) without timezone conversion. */
function formatDateOfBirth(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate || EMPTY_VALUE;
  return `${day}/${month}/${year}`;
}

function formatFullName(patient: Patient): string {
  return `${patient.firstName} ${patient.lastName}`.trim() || EMPTY_VALUE;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-offset-(--spacing-sm) focus-visible:outline-input-border-focus';

export function PatientSearch({ onSelectPatient, searchFn = searchPatients }: PatientSearchProps) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>({ status: 'idle' });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Ignore responses from an older search if staff searched again before it finished.
  const latestRequest = useRef(0);

  async function runSearch(rawQuery: string) {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      setState({ status: 'invalid' }); // AC1: an empty query is not a search
      return;
    }

    const requestId = ++latestRequest.current;
    setSelectedId(null);
    setState({ status: 'loading' });

    try {
      const patients = await searchFn(trimmed);
      if (requestId !== latestRequest.current) return;
      setState(patients.length === 0 ? { status: 'empty' } : { status: 'results', patients });
    } catch {
      if (requestId !== latestRequest.current) return;
      setState({ status: 'error' });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(query);
  }

  function handleSelect(patient: Patient) {
    setSelectedId(patient.id);
    onSelectPatient(patient);
  }

  return (
    <section
      aria-labelledby="patient-search-title"
      className="flex w-full min-w-0 flex-col gap-(--spacing-form-column-gap) rounded-card bg-surface-card p-(--spacing-form-column-gap) font-body text-text-base shadow-card"
    >
      <h2 id="patient-search-title" className="text-card-header font-semibold text-text-title">
        ค้นหาผู้ป่วย
      </h2>

      <form role="search" onSubmit={handleSubmit} className="flex flex-col gap-(--spacing-form-row-gap)" noValidate>
        <label htmlFor="patient-search-query" className="text-card-header-sm font-semibold text-text-base">
          HN หรือชื่อผู้ป่วย
        </label>
        <div className="flex flex-col gap-(--spacing-form-row-gap) sm:flex-row">
          <input
            id="patient-search-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="เช่น 65000123 หรือ Jaidee"
            aria-describedby="patient-search-hint"
            aria-invalid={state.status === 'invalid'}
            autoComplete="off"
            className={`min-w-0 flex-1 rounded-input border border-input-border bg-surface-card px-(--spacing-main) py-(--spacing-md) text-text-base hover:border-input-border-hover focus-visible:border-input-border-focus ${focusRing}`}
          />
          <button
            type="submit"
            className={`rounded-btn bg-button-primary px-(--spacing-form-column-gap) py-(--spacing-md) text-button font-semibold text-on-primary hover:bg-primary-hover ${focusRing}`}
          >
            ค้นหา
          </button>
        </div>
        <p id="patient-search-hint" className="text-card-header-sm text-text-mid">
          {state.status === 'invalid' ? 'กรุณากรอก HN หรือชื่อผู้ป่วยก่อนค้นหา' : 'ค้นหาได้ด้วย HN หรือชื่อ-นามสกุล'}
        </p>
      </form>

      <div aria-live="polite" className="flex min-w-0 flex-col gap-(--spacing-form-row-gap)">
        {state.status === 'loading' && (
          <p role="status" className="text-text-mid">
            กำลังค้นหาผู้ป่วย…
          </p>
        )}

        {state.status === 'empty' && (
          <div role="status" className="rounded-card border border-input-border p-(--spacing-main)">
            <p className="font-semibold text-text-base">ไม่พบผู้ป่วยที่ตรงกับคำค้นหา</p>
            <p className="text-card-header-sm text-text-mid">ตรวจสอบ HN หรือการสะกดชื่อ แล้วลองค้นหาอีกครั้ง</p>
          </div>
        )}

        {state.status === 'error' && (
          <div
            role="alert"
            className="flex flex-col items-start gap-(--spacing-form-row-gap) rounded-card border border-danger-default bg-danger-faded p-(--spacing-main)"
          >
            <p className="font-semibold text-text-base">ระบบค้นหาขัดข้อง ยังไม่สามารถแสดงผลได้</p>
            <p className="text-card-header-sm text-text-base">ข้อมูลที่กรอกไว้ยังอยู่ กดลองอีกครั้งได้เลย</p>
            <button
              type="button"
              onClick={() => void runSearch(query)}
              className={`rounded-btn border border-primary-default bg-surface-card px-(--spacing-form-column-gap) py-(--spacing-md) text-button font-semibold text-primary-default hover:border-primary-hover hover:text-primary-hover ${focusRing}`}
            >
              ลองอีกครั้ง
            </button>
          </div>
        )}

        {state.status === 'results' && (
          <>
            <p role="status" className="text-card-header-sm text-text-mid">
              พบผู้ป่วย {state.patients.length} ราย — เลือกได้ 1 ราย
            </p>
            <ul aria-label="ผลการค้นหาผู้ป่วย" className="flex flex-col gap-(--spacing-form-row-gap)">
              {state.patients.map((patient) => {
                const isSelected = patient.id === selectedId;
                return (
                  <li key={patient.id} className="min-w-0">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelect(patient)}
                      className={`flex w-full min-w-0 flex-col gap-(--spacing-md) rounded-card border p-(--spacing-main) text-left ${focusRing} ${
                        isSelected
                          ? 'border-primary-default bg-table-row-selected'
                          : 'border-input-border bg-surface-card hover:border-input-border-hover'
                      }`}
                    >
                      <span className="flex min-w-0 flex-wrap items-baseline justify-between gap-(--spacing-form-row-gap)">
                        <span className="min-w-0 text-card-header font-semibold text-text-title wrap-anywhere">
                          {formatFullName(patient)}
                        </span>
                        {isSelected && (
                          <span className="text-card-header-sm font-semibold text-primary-default">✓ เลือกแล้ว</span>
                        )}
                      </span>
                      <dl className="grid min-w-0 grid-cols-1 gap-x-(--spacing-form-column-gap) gap-y-(--spacing-sm) sm:grid-cols-3">
                        <div className="min-w-0">
                          <dt className="text-card-header-sm text-text-mid">HN</dt>
                          <dd className="text-text-base wrap-anywhere">{patient.hn || EMPTY_VALUE}</dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-card-header-sm text-text-mid">วันเกิด (ค.ศ.)</dt>
                          <dd className="text-text-base">{formatDateOfBirth(patient.dateOfBirth)}</dd>
                        </div>
                        <div className="min-w-0">
                          <dt className="text-card-header-sm text-text-mid">เพศ</dt>
                          <dd className="text-text-base">{genderLabel[patient.gender] ?? EMPTY_VALUE}</dd>
                        </div>
                      </dl>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
