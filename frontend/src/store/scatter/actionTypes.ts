import Scatter from 'scatterjs-core';

export enum ScatterActionType {
    Connect = 'SCATTER_CONNECT',
    ConnectOk = 'SCATTER_CONNECT_OK',
    ConnectErr = 'SCATTER_CONNECT_ERR',
    Login = 'SCATTER_LOGIN',
    LoginOk = 'SCATTER_LOGIN_OK',
    LoginErr = 'SCATTER_LOGIN_ERR',
    Logout = 'SCATTER_LOGOUT',
    LogoutOk = 'SCATTER_LOGOUT_OK',
    SuggestNetwork = 'SCATTER_SUGGEST_NETWORK',
    SuggestNetworkOk = 'SCATTER_SUGGEST_NETWORK_OK',
    SuggestNetworkErr = 'SCATTER_SUGGEST_NETWORK_ERR',
}

export type ScatterAction =
    | ConnectAction
    | ConnectOkAction
    | ConnectErrAction
    | LoginAction
    | LoginOkAction
    | LoginErrAction
    | LogoutAction
    | LogoutOkAction
    | SuggestNetworkAction
    | SuggestNetworkOkAction
    | SuggestNetworkErrAction;

export interface ConnectAction {
    readonly type: ScatterActionType.Connect;
    readonly appName: string;
}

export interface ConnectOkAction {
    readonly type: ScatterActionType.ConnectOk;
    readonly appName: string;
    readonly identity: Scatter.Identity | void;
}

export interface ConnectErrAction {
    readonly type: ScatterActionType.ConnectErr;
    readonly appName: string;
}

export interface LoginAction {
    readonly type: ScatterActionType.Login;
    readonly options: Scatter.LoginOptions;
}

export interface LoginOkAction {
    readonly type: ScatterActionType.LoginOk;
    readonly identity: Scatter.Identity;
}

export interface LoginErrAction {
    readonly type: ScatterActionType.LoginErr;
    readonly error: Scatter.LoginError;
}

export interface LogoutAction {
    readonly type: ScatterActionType.Logout;
    readonly identity: Scatter.Identity;
}

export interface LogoutOkAction {
    readonly type: ScatterActionType.LogoutOk;
}

export interface SuggestNetworkAction {
    readonly type: ScatterActionType.SuggestNetwork;
}

export interface SuggestNetworkOkAction {
    readonly type: ScatterActionType.SuggestNetworkOk;
}

export interface SuggestNetworkErrAction {
    readonly type: ScatterActionType.SuggestNetworkErr;
    readonly error: Scatter.SuggestNetworkError;
}