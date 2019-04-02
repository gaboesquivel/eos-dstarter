import { WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import styles from '../styles/appStyles';

export interface Props
    extends WithStyles<typeof styles>,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > {}

function AppFooter({ classes, ...props }: Props) {
    return (
        <footer
            {...props}
            className={classNames(classes.appFooter, props.className)}
        >
            Footer
        </footer>
    );
}

export default AppFooter;
