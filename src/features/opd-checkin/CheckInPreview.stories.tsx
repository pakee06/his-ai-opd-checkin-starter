import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';
import { clinics } from '@/mocks/clinics';
import { patients } from '@/mocks/patients';
import { CheckInPreview } from './CheckInPreview';

/*
 * All data comes from src/mocks (patients.ts, clinics.ts). onBack / onConfirm are Storybook actions —
 * press the buttons and check the Actions panel.
 */

const somchai = patients[0]; // HN 65000123, Somchai Jaidee

const meta = {
  title: 'OPD Check-in/CheckInPreview',
  component: CheckInPreview,
  parameters: { layout: 'padded' },
  args: {
    patient: somchai,
    clinics,
    values: { clinicId: 'gen-med', chiefComplaint: 'ปวดศีรษะ 2 วัน' },
    onBack: fn(),
    onConfirm: fn(),
  },
} satisfies Meta<typeof CheckInPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Given a Clinic and Chief Complaint were entered, Preview shows the patient, the Clinic and the Chief Complaint (AC10). */
export const WithChiefComplaint: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Somchai Jaidee')).toBeVisible();
    await expect(canvas.getByText('65000123')).toBeVisible();
    await expect(canvas.getByText('General Medicine')).toBeVisible();
    await expect(canvas.getByText('ปวดศีรษะ 2 วัน')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'ย้อนกลับไปแก้ไข' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'ยืนยันการลงทะเบียน' })).toBeVisible();
  },
};

/** Given Chief Complaint was left blank (AC9), Preview still shows the row with "ไม่ได้ระบุ" (AC10). */
export const WithoutChiefComplaint: Story = {
  args: {
    values: { clinicId: 'gen-med', chiefComplaint: '' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('General Medicine')).toBeVisible();
    await expect(canvas.getByText('ไม่ได้ระบุ')).toBeVisible();
  },
};
