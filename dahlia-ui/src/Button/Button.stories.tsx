import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';
import { MdClose, MdHome } from 'react-icons/md';

export default {
  title: 'commons/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => (
  <div className="flex flex-col gap-2">
    <p className="flex gap-2 bt-2">
      <span className="w-32">brand colors</span>
      <Button {...args} className="btn btn-md">
        normal
      </Button>
      <Button {...args} className="btn btn-primary btn-md">
        primary
      </Button>
      <Button {...args} className="btn btn-secondary btn-md">
        secondary
      </Button>
      <Button {...args} className="btn btn-accent btn-md">
        accent
      </Button>
      <Button {...args} className="btn btn-ghost btn-md">
        ghost
      </Button>
      <Button {...args} className="btn btn-link btn-md">
        link
      </Button>
    </p>
    <p className="flex gap-2 bt-2">
      <span className="w-32">status colors</span>
      <Button {...args} className="btn btn-info btn-md">
        info
      </Button>
      <Button {...args} className="btn btn-success btn-md">
        success
      </Button>
      <Button {...args} className="btn btn-warning btn-md">
        warning
      </Button>
      <Button {...args} className="btn btn-error btn-md">
        error
      </Button>
    </p>
    <p className="flex gap-2 bt-2">
      <span className="w-32">styles</span>
      <Button {...args} className="btn btn-outline btn-primary btn-md">
        outline
      </Button>
      <Button {...args} className="btn btn-link btn-primary btn-md">
        link
      </Button>
      <Button {...args} className="btn btn-wide btn-primary btn-sm">
        wide
      </Button>
      <Button {...args} className="btn btn-disabled btn-primary btn-sm">
        disabled
      </Button>
      <span className="bg-red-500 p-4">
        <Button {...args} className="btn glass">
          glass
        </Button>
      </span>
    </p>
    <p className="flex gap-2 bt-2">
      <span className="w-32">size</span>
      <Button {...args} className="btn btn-lg">
        btn-lg
      </Button>
      <Button {...args} className="btn btn-md">
        btn-md
      </Button>
      <Button {...args} className="btn btn-sm">
        btn-sm
      </Button>
      <Button {...args} className="btn btn-xs">
        btn-xs
      </Button>
    </p>
    <p className="flex gap-2 bt-2">
      <span className="w-32">icons</span>
      <Button {...args} className="btn btn-square">
        <MdClose />
      </Button>
      <Button {...args} className="btn btn-circle">
        <MdClose />
      </Button>
      <Button {...args} className="btn">
        <MdHome />
        <span>with text</span>
      </Button>
      <Button {...args} className="btn btn-xs">
        <span>with text</span>
        <MdHome />
      </Button>
    </p>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  children: 'Button',
};
