import styled from 'styled-components'
import { IHeaderContainerOwnProps } from './Header'

const Wrapper = styled.section<IHeaderContainerOwnProps>`
    font-size: 1.5rem;
    background-color: green;
    height: ${props => props.height ? `${props.height}px` : '200px'}
`

export {
    Wrapper
}