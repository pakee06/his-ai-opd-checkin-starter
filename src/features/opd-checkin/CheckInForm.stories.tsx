import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { clinics } from '@/mocks/clinics';
import { patients } from '@/mocks/patients';
import { CheckInForm } from './CheckInForm';

/*
 * All data comes from src/mocks (patients.ts, clinics.ts). onContinue is a Storybook action —
 * check the Actions panel to see the Clinic and Chief Complaint that would be sent to Preview.
 */

const somchai = patients[0]; // HN 65000123, Somchai Jaidee

const meta = {
  title: 'OPD Check-in/CheckInForm',
  component: CheckInForm,
  parameters: { layout: 'padded' },
  args: {
    patient: somchai,
    clinics,
    onContinue: fn(),
  },
} satisfies Meta<typeof CheckInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Given a patient was selected, the form shows HN, full name, date of birth and gender (AC7);
 * no Clinic is selected yet and Chief Complaint is blank (AC9 — it may stay blank).
 */
export const Default: Story = {};

/** Given no Clinic is selected, when staff presses ไปต่อ, a clear warning is shown and Preview is not reached (AC8). */
export const ClinicRequired: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'ไปต่อ: ตรวจสอบข้อมูล' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('กรุณาเลือกคลินิก');
    await expect(canvas.getByLabelText(/คลินิก/)).toHaveAttribute('aria-invalid', 'true');
    await expect(args.onContinue).not.toHaveBeenCalled();
  },
};

/** Given staff came back from Preview, the Clinic and Chief Complaint entered before are still filled in (AC11). */
export const ReturnedFromPreview: Story = {
  args: {
    initialValues: { clinicId: 'gen-med', chiefComplaint: 'ปวดศีรษะ 2 วัน' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText(/คลินิก/)).toHaveValue('gen-med');
    await expect(canvas.getByLabelText(/อาการเบื้องต้น/)).toHaveValue('ปวดศีรษะ 2 วัน');
  },
};
