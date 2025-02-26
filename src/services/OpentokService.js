import OT from '@opentok/client';

// Environment configuration (adjust based on your React setup)
const TOKBOX_API_KEY = 47952991;

const OpentokService = {
    token: '',

    // Get OpenTok client
    getOT() {
        return OT;
    },

    // Initialize OpenTok session
    async initSession(token, sessionId) {
        if (TOKBOX_API_KEY && token && sessionId) {
            const session = this.getOT().initSession(TOKBOX_API_KEY, sessionId);
            this.token = token;
            return Promise.resolve(session);
        } else {
            console.error(
                `Init Session failed. Missing parameters: API Key: ${TOKBOX_API_KEY}, Token: ${token}, Session ID: ${sessionId}`
            );
            return Promise.reject('Session initialization failed due to missing parameters.');
        }
    },

    // Connect to OpenTok session
    async connect(session) {
        return new Promise((resolve, reject) => {
            if (!session) {
                reject('Session is not initialized');
                return;
            }

            session.connect(this.token, (err) => {
                if (err) {
                    reject(err);
                    console.error('Error in connect method:', err);
                    if (err.name === 'OT_NOT_CONNECTED') {
                        alert('You are not connected to the internet. Check your network connection.');
                    }
                } else {
                    resolve(session);
                    sessionStorage.setItem('otconnectionid', session.connection.connectionId);
                    console.info('OT.ConnectionID:', session.connection.connectionId);
                }
            });
        });
    },
};

export default OpentokService;
