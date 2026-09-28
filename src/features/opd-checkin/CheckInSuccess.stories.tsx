import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CheckInSuccess } from './CheckInSuccess';

/* onStartNew is a Storybook action — press the button and check the Actions panel. */

const meta = {
  title: 'OPD Check-in/CheckInSuccess',
  component: CheckInSuccess,
  parameters: { layout: 'padded' },
  args: {
    queueNumber: 'A012', // synthetic queue number from AC12
    onStartNew: fn(),
  },
} satisfies Meta<typeof CheckInSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Given the check-in was confirmed, a Success state shows queue number A012 and a way to start a new check-in (AC12). */
export const Success: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toHaveTextContent('ลงทะเบียนเข้ารับบริการสำเร็จ');
    await expect(canvas.getByText('A012')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'เริ่ม check-in ผู้ป่วยรายใหม่' }));
    await expect(args.onStartNew).toHaveBeenCalledTimes(1);
  },
};
