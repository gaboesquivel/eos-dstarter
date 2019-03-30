import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import SiteSkeleton from '../../components/SiteSkeleton';
import { AppState } from '../../store';
import * as scatter from '../../store/scatter';
import * as startPage from '../../store/startPage';
import CategoryStep from './CategoryStep';
import ChainStep from './ChainStep';
import IdeaStep from './IdeaStep';
import styles from './styles';

export interface Props extends WithStyles<typeof styles> {
    readonly scatter: scatter.ScatterState;
    readonly scatterConnect: any;
    readonly state: startPage.StartPageState;
    readonly nextStep: typeof startPage.nextStep;
    readonly prevStep: typeof startPage.prevStep;
    readonly setCategory: typeof startPage.setCategory;
    readonly setDescription: typeof startPage.setDescription;
    readonly setNetworkUrl: typeof startPage.setNetworkUrl;
}

function StartPage(props: Props) {
    switch (props.scatter.type) {
    case scatter.ScatterStateType.Idle:
        props.scatterConnect('DStarter');
    case scatter.ScatterStateType.Connecting:
        return <>Loading...</>;
    case scatter.ScatterStateType.Connected:
        return <ScatterAvailable {...props} />;
    case scatter.ScatterStateType.Unavailable:
        return <ScatterRequired />;
    }
}

function ScatterRequired() {
    return <div>Scatter is required</div>;
}

function ScatterAvailable({ classes, state, ...props }: Props) {
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
                    {startPage.formStepTypes.map((formStepType) => (
                        <Step key={formStepType}>
                            <StepLabel>
                                {startPage.getStepLabel(formStepType)}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <ActiveStep state={state} classes={classes} {...props} />
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

function ActiveStep(props: Props) {
    switch (props.state.activeStep) {
    case startPage.FormStepType.Category:
        return (
                <CategoryStep
                    classes={props.classes}
                    value={props.state.category}
                    setCategory={props.setCategory}
                    nextStep={props.nextStep}
                />
        );
    case startPage.FormStepType.Idea:
        return (
                <IdeaStep
                    classes={props.classes}
                    value={props.state.description}
                    setDescription={props.setDescription}
                    prevStep={props.prevStep}
                    nextStep={props.nextStep}
                />
        );
    case startPage.FormStepType.Chain:
        return (
                <ChainStep
                    classes={props.classes}
                    value={props.state.networkUrl}
                    setNetworkUrl={props.setNetworkUrl}
                    prevStep={props.prevStep}
                />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    scatter: state.scatter,
    state: state.startPage,
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        {
            scatterConnect: scatter.connect,
            nextStep: startPage.nextStep,
            prevStep: startPage.prevStep,
            setCategory: startPage.setCategory,
            setDescription: startPage.setDescription,
            setNetworkUrl: startPage.setNetworkUrl,
        },
    )(StartPage),
);