export const errorParser = errors => {
    //maps through array of errors
    //returning each error with first letter capitalized
    return errors
        .map(error => error.message)
        .map(message => message.charAt(0).toUpperCase() + message.slice(1));
};
