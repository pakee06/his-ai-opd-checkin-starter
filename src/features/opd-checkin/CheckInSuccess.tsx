'use client';

import { focusRing } from './patient-display';

/*
 * CheckInSuccess — US-001 AC12 (show the synthetic queue number, start another check-in).
 * Standalone component: props in, callback out. Calls no service and is not wired into any page yet.
 * The parent resets the previous form state when onStartNew is called.
 * Styling uses only Suth tokens from DESIGN.md (declared in src/app/globals.css).
 */

export type CheckInSuccessProps = {
  /** Synthetic queue number to display, e.g. "A012". Not a real queue allocation. */
  queueNumber: string;
  /** Staff starts a new check-in (AC12). */
  onStartNew: () => void;
};

export function CheckInSuccess({ queueNumber, onStartNew }: CheckInSuccessProps) {
  return (
    <section
      aria-labelledby="check-in-success-title"
      className="flex w-full min-w-0 flex-col gap-(--spacing-form-column-gap) rounded-card bg-surface-card p-(--spacing-form-column-gap) font-body text-text-base shadow-card"
    >
      <div
        role="status"
        className="flex min-w-0 flex-col items-center gap-(--spacing-md) rounded-card border border-success-default bg-success-faded p-(--spacing-form-column-gap) text-center"
      >
        <h2 id="check-in-success-title" className="text-card-header font-semibold text-text-base">
          ✓ ลงทะเบียนเข้ารับบริการสำเร็จ
        </h2>
        <p className="text-card-header-sm text-text-mid">หมายเลขคิว</p>
        <p className="text-card-header font-bold text-text-title wrap-anywhere">{queueNumber}</p>
      </div>

      <button
        type="button"
        onClick={onStartNew}
        className={`w-full rounded-btn bg-button-primary px-(--spacing-form-column-gap) py-(--spacing-main) text-button font-semibold text-on-primary hover:bg-primary-hover ${focusRing}`}
      >
        เริ่ม check-in ผู้ป่วยรายใหม่
      </button>
    </section>
  );
}
