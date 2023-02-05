import React from 'react'
import { Story } from '@storybook/react'
import Header, { IHeaderContainerOwnProps, IHeaderOwnProps } from './Header'

export default {
    title: "Header",
    component: Header,
};

const Template: Story<IHeaderOwnProps> = args => <Header {...args} />

const HeaderContainerTemplate: Story<IHeaderContainerOwnProps> = args => <Header.Container {...args} />

export const Primary = Template.bind({});
Primary.args = {
    children: "Primary"
}

export const HeaderContainer = HeaderContainerTemplate.bind({})
HeaderContainer.args = {
    children: "Demo",
    height: 200
}

export const HeaderContainerDefault = HeaderContainerTemplate.bind({})
HeaderContainerDefault.args = {
    children: "Header container with default setting",
}