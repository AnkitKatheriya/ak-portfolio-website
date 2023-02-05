import React from "react";
import { Wrapper } from "./Header.style";

// interface IHeaderWithCustomProps {
//     Container: string
// }

interface IHeaderPropsWithChildren {
    children: React.ReactNode,
    // props?: React.ReactPropTypes
}

interface IHeaderOwnProps extends IHeaderPropsWithChildren {
}

interface IHeaderContainerOwnProps extends IHeaderOwnProps {
}

const Header = ({ children }: IHeaderOwnProps) : React.ReactElement => {
    return <section>{children}</section>
}

Header.Container = ({ children }: IHeaderContainerOwnProps): React.ReactElement => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Header