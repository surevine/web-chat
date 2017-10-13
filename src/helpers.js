// This is a workaround to extract the form ID from the message delivered by plugin,
// as it is not available elsewhere
// This should be removed in favour of the ID being delivered by the 
export const parseFormIdFromMessage = (message) => {
    
    // <a href='jchat://pubsub.localhost?select-form&node=medivac&id=b87ecb10-def2-43cf-81fd-42384b6dd298'>===== MEDEVAC 9-Line =====</a>

    let queryParamStart = "&id=";
    let queryParamEnd = "'>";

    let queryParamStartIndex = message.body.indexOf(queryParamStart) + queryParamStart.length;
    let queryParamEndIndex = message.body.indexOf(queryParamEnd);
    let idLength = queryParamEndIndex - queryParamStartIndex;

    let id = message.body.substr(queryParamStartIndex, idLength);

    return id;
}