import {ipServer} from '../../../../configuration'

export const urlNode = () => {
    return `http://${ipServer}:3001`
}