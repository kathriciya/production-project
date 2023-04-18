import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <div style={{ paddingTop: '150px' }}>
    <ListBox {...args} />
  </div>
);

export const NormalTop = Template.bind({});
NormalTop.args = {
  items: [
    { value: '1', content: 'Первый' },
    { value: '2', content: 'Второй' },
    { value: '3', content: 'Третий' },
  ],
  value: '1',
  defaultValue: '',
  readonly: false,
  label: 'Выберите значение',
  direction: 'top',
};

export const NormalBottom = Template.bind({});
NormalBottom.args = {
  items: [
    { value: '1', content: 'Первый' },
    { value: '2', content: 'Второй' },
    { value: '3', content: 'Третий' },
  ],
  value: '1',
  defaultValue: '',
  readonly: false,
  label: 'Выберите значение',
  direction: 'bottom',
};
