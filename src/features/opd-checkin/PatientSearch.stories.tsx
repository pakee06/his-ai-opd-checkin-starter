import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import type { Patient } from '@/mocks/patients';
import { searchPatients } from '@/services/patient-service';
import { PatientSearch } from './PatientSearch';

/*
 * Every story injects searchFn built on the existing mock service (src/services/patient-service.ts),
 * so each state is reproducible. Play functions type a query and press ค้นหา like staff would.
 */

const meta = {
  title: 'OPD Check-in/PatientSearch',
  component: PatientSearch,
  parameters: { layout: 'padded' },
  args: {
    onSelectPatient: fn(),
    searchFn: (query: string) => searchPatients(query, 'normal'),
  },
} satisfies Meta<typeof PatientSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

async function searchFor(canvasElement: HTMLElement, query: string) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByLabelText('HN หรือชื่อผู้ป่วย'), query);
  await userEvent.click(canvas.getByRole('button', { name: 'ค้นหา' }));
  return canvas;
}

/** Given staff has not searched yet, the search box and hint are shown with no results. */
export const Default: Story = {};

/** Given a search that has not answered yet, a visible loading message is shown (AC2). */
export const Loading: Story = {
  args: {
    // Pending forever so the loading state stays on screen for review (the service's 'slow' scenario resolves after 1.8s).
    searchFn: () => new Promise<Patient[]>(() => {}),
  },
  play: async ({ canvasElement }) => {
    const canvas = await searchFor(canvasElement, 'Jaidee');
    await expect(await canvas.findByText('กำลังค้นหาผู้ป่วย…')).toBeVisible();
  },
};

/** Given no patient matches, a clear "not found" message is shown (AC3). */
export const Empty: Story = {
  args: {
    searchFn: (query: string) => searchPatients(query, 'empty'),
  },
  play: async ({ canvasElement }) => {
    const canvas = await searchFor(canvasElement, '99999999');
    await expect(await canvas.findByText('ไม่พบผู้ป่วยที่ตรงกับคำค้นหา')).toBeVisible();
  },
};

/** Given "Jaidee" matches more than one patient, each card shows HN, full name, date of birth and gender (AC1, AC5, AC7). */
export const WithResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = await searchFor(canvasElement, 'Jaidee');
    const list = await canvas.findByRole('list', { name: 'ผลการค้นหาผู้ป่วย' });
    const cards = within(list).getAllByRole('button');
    await expect(cards).toHaveLength(2);
    await expect(within(list).getByText('Somchai Jaidee')).toBeVisible();
    await expect(within(list).getByText('65000123')).toBeVisible();
  },
};

/** Given the search service fails, an error message and a Retry button are shown (AC4). */
export const ErrorState: Story = {
  // Exported as ErrorState so it does not shadow the global Error constructor in this module.
  name: 'Error',
  args: {
    searchFn: (query: string) => searchPatients(query, 'error'),
  },
  play: async ({ canvasElement }) => {
    const canvas = await searchFor(canvasElement, '65000123');
    await expect(await canvas.findByRole('alert')).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'ลองอีกครั้ง' })).toBeVisible();
  },
};
