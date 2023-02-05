import React from "react";
import { Wrapper } from "./Header.style";

// interface IHeaderWithCustomProps {
//     Container: string
// }

interface IHeaderPropsWithChildren {
    children: React.ReactNode,
    // props?: React.ReactPropTypes
}

export interface IHeaderOwnProps extends IHeaderPropsWithChildren {
}

export interface IHeaderContainerOwnProps extends IHeaderOwnProps {
    height: number
}

const Header = ({ children }: IHeaderOwnProps) : React.ReactElement => {
    return <section>{children}</section>
}

Header.Container = ({ children, ...restProps }: IHeaderContainerOwnProps): React.ReactElement => {
    return (
        <Wrapper {...restProps}>
            {children}
        </Wrapper>
    )
}

export default Header