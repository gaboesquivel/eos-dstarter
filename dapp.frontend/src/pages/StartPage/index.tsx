import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useMemo, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import SiteSkeleton from '../../components/SiteSkeleton';
import { useScatter } from '../../context/scatter';
import ActiveStep from './ActiveStep';
import {
    formStepTypes,
    getStepLabel,
    initialState,
    newProject,
    reducer,
} from './state';

const styles = (theme: Theme) => ({
    container: {
        maxWidth: '960px',
        margin: '0 auto',
    },
    stepper: {
        background: 'transparent',
    },
    footer: {
        margin: '0 auto',
        maxWidth: '460px',
        opacity: 0.5,
    },
});

export interface Props extends WithStyles<typeof styles> {}

function StartPage(props: Props) {
    const scatter = useScatter();

    console.warn('!!!!!!!', scatter);

    switch (scatter.type) {
    case 'idle':
        scatter.connect('DStarter');
    case 'connecting':
        return <>Loading...</>;
    case 'connected':
        return <ScatterAvailable {...props} />;
    case 'unavailable':
        return <ScatterRequired />;
    }
}

function ScatterRequired() {
    return <div>Scatter is required</div>;
}

function ScatterAvailable({ classes }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SiteSkeleton hideFooter hideSiteNav hideUserNav>
            <Helmet>
                <title>Create your project</title>
            </Helmet>
            <div className={classes.container}>
                <Stepper
                    activeStep={state.activeStep}
                    className={classes.stepper}
                >
                    {formStepTypes.map((formStepType) => (
                        <Step key={formStepType}>
                            <StepLabel>{getStepLabel(formStepType)}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <ActiveStep state={state} dispatch={dispatch} />
                <Button onClick={() => newProject(state)}>Temp</Button>
                <Typography
                    variant='body1'
                    align='center'
                    className={classes.footer}
                >
                    To create a project, you're required to have an account on a
                    supported EOSIO blockchain. Please note: after launch, your
                    ability to edit, hide, or delete a project is limited.
                </Typography>
            </div>
        </SiteSkeleton>
    );
}

export default withStyles(styles, { withTheme: true })(StartPage);