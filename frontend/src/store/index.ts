import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { create } from 'redux-react-hook';
import createSagaMiddleware from 'redux-saga';
import * as App from './app';
import * as Chains from './chains';
import * as DraftPage from './draftPage';
import * as Explorers from './explorers';
import * as LoginPage from './loginPage';
import * as MyProjectsPage from './myProjectsPage';
import * as Projects from './projects';
import * as Root from './root';
import * as RpcServers from './rpcServers';
import * as Scatter from './scatter';
import * as StartPage from './startPage';

export function makeStore(): Store<Root.State, Root.Action> {
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = applyMiddleware(sagaMiddleware);
    const store = createStore<Root.State, Root.Action, {}, {}>(
        Root.reducer,
        composeWithDevTools({ name: 'weos.fund' })(enhancer),
    );
    sagaMiddleware.run(Root.saga);
    return store;
}

export const { StoreContext, useDispatch, useMappedState } = create<
    Root.State,
    Root.Action,
    Store<Root.State, Root.Action>
>();

export {
    App,
    Chains,
    DraftPage,
    Explorers,
    LoginPage,
    MyProjectsPage,
    Root,
    RpcServers,
    Scatter,
    StartPage,
    Projects,
};
export default {
    App,
    Chains,
    DraftPage,
    Explorers,
    LoginPage,
    MyProjectsPage,
    Root,
    RpcServers,
    Scatter,
    StartPage,
    Projects,
    useDispatch,
    useMappedState,
    StoreContext,
};
