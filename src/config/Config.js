import { environment } from "../environment/Environment"

const config = {
    appDomain: environment.appDomain,
    appDirectory: environment.appDirectory,
    apiDirectory: environment.apiDirectory,

}

export const App_url = () => {
    return {
        sign_in: `http:${config.appDomain}${config.apiDirectory}/login`
    }
}