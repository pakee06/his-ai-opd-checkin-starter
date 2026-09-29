'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckInForm, type CheckInFormValues } from '@/features/opd-checkin/CheckInForm';
import { CheckInPreview } from '@/features/opd-checkin/CheckInPreview';
import { CheckInSuccess } from '@/features/opd-checkin/CheckInSuccess';
import { PatientSearch } from '@/features/opd-checkin/PatientSearch';
import { clinics } from '@/mocks/clinics';
import type { Patient } from '@/mocks/patients';

/*
 * /opd/check-in — US-001 flow assembled from the reviewed components (no new product components).
 *   form    → PatientSearch (left) + CheckInForm once a patient is selected (right)   AC1–AC9
 *   preview → CheckInPreview; Back returns to CheckInForm with the same values          AC10–AC11
 *   success → CheckInSuccess with the synthetic queue number; Start new resets all      AC12
 * Search uses PatientSearch's default mock service (src/services/patient-service.ts). No backend.
 * Layout follows docs/design/opd-check-in-reference.png (2 columns, page header); tokens from DESIGN.md.
 */

type Step = 'form' | 'preview' | 'success';

/** AC12: synthetic queue number. Not a real queue allocation. */
const SYNTHETIC_QUEUE_NUMBER = 'A012';

export default function OpdCheckInPage() {
  const [step, setStep] = useState<Step>('form');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [values, setValues] = useState<CheckInFormValues | null>(null);
  // Bumped on "start new" so PatientSearch and CheckInForm remount with empty state (AC12).
  const [flowId, setFlowId] = useState(0);

  const stepPanelRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Move keyboard/screen-reader focus to the step that just appeared (the button pressed has gone).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (step === 'form' && !patient) {
      document.getElementById('patient-search-query')?.focus();
    } else {
      stepPanelRef.current?.focus();
    }
    // Only react to step changes / new flow, not to picking a different patient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, flowId]);

  function handleContinue(nextValues: CheckInFormValues) {
    setValues(nextValues);
    setStep('preview');
  }

  function handleStartNew() {
    setPatient(null);
    setValues(null);
    setStep('form');
    setFlowId((id) => id + 1);
  }

  const isFormStep = step === 'form';

  return (
    <main className="min-h-screen bg-surface-app p-(--spacing-form-column-gap) font-body text-text-base">
      <div className="mx-auto flex w-full min-w-0 max-w-(--layout-max-content-width) flex-col gap-(--spacing-form-column-gap)">
        <header className="flex min-w-0 flex-col gap-(--spacing-md)">
          <p className="text-card-header-sm font-semibold uppercase text-primary-default">US-001 · OPD Training Workspace</p>
          <h1 className="text-3xl font-bold text-text-base">ลงทะเบียนเข้ารับบริการผู้ป่วยนอก</h1>
          <p className="text-text-mid">ค้นหาผู้ป่วยด้วย HN หรือชื่อ เลือกผู้ป่วย จากนั้นเลือกคลินิกและยืนยันเพื่อเข้าคิว</p>
        </header>

        <div
          className={
            isFormStep
              ? 'grid min-w-0 grid-cols-1 items-start gap-(--spacing-form-column-gap) lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)]'
              : 'mx-auto grid w-full min-w-0 max-w-(--breakpoint-sm) grid-cols-1'
          }
        >
          {/* Kept mounted (only hidden) during Preview so the search results are still there after Back. */}
          <div hidden={!isFormStep} className="min-w-0">
            <PatientSearch key={flowId} onSelectPatient={setPatient} />
          </div>

          <div ref={stepPanelRef} tabIndex={-1} className="min-w-0 outline-none">
            {step === 'form' &&
              (patient ? (
                <CheckInForm
                  key={flowId}
                  patient={patient}
                  clinics={clinics}
                  initialValues={values ?? undefined}
                  onContinue={handleContinue}
                />
              ) : (
                <section
                  aria-label="ลงทะเบียนเข้ารับบริการ"
                  className="rounded-card border border-dashed border-input-border bg-surface-card p-(--spacing-form-column-gap) text-center text-text-mid"
                >
                  เลือกผู้ป่วยจากผลการค้นหาเพื่อเริ่มลงทะเบียน
                </section>
              ))}

            {step === 'preview' && patient && values && (
              <CheckInPreview
                patient={patient}
                clinics={clinics}
                values={values}
                onBack={() => setStep('form')}
                onConfirm={() => setStep('success')}
              />
            )}

            {step === 'success' && <CheckInSuccess queueNumber={SYNTHETIC_QUEUE_NUMBER} onStartNew={handleStartNew} />}
          </div>
        </div>

        <p className="text-card-header-sm italic text-text-mid">
          ข้อมูลทั้งหมดในหน้านี้เป็น mock/synthetic data ไม่ใช่ข้อมูลผู้ป่วยจริง
        </p>
      </div>
    </main>
  );
}
