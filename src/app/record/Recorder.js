
import OpentokService from "../../services/OpentokService";
import CommonService from "../../services/CommonService";
const Recorder = async () => {
    console.log("Recorder.js Loaded");

    let session_details = { sessionId: "", token: "" }; // Make sure this is defined using 'let' so it can be modified

    const fetchSessionDetails = async () => {
        try {
            const response = await CommonService.getRequest("recorder/session");
            console.log(response);
            session_details = { ...session_details, sessionId: response.SessionID };
            session_details = { ...session_details, token: response.Token };

            console.log("Session ID:", session_details.sessionId);
        } catch (error) {
            console.error("Error fetching session details:", error);
        }
    };

    await fetchSessionDetails();

    if (session_details.sessionId && session_details.token) {
        try {
            const session = await OpentokService.initSession(session_details.token, session_details.sessionId);
            await OpentokService.connect(session);
            console.log("Session Connected!");
        } catch (error) {
            console.error("Unable to connect to session: ", error);
        }
    }

    // Return session_details at the end of the function
    return session_details;
};

export default Recorder;
