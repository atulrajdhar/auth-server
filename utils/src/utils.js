const JWTExpiresInStringToSeconds = (expiresIn) => {
    // console.log("expiresIn: " + expiresIn);
    if(!expiresIn)
        throw Error("ExpiresIn should not be empty");
    
    // check if expiresIn does not end with a letter
    if(/^\d+$/.test(expiresIn))
        return expiresIn;
    
    // get index of last digit
    let re = /[0-9](?=\D*$)/gi;
    re.exec(expiresIn);
    let lastIndexOfDigit = re.lastIndex;  
    
    // get duration
    let duration = expiresIn.substring(0, lastIndexOfDigit);
    // console.log(duration);

    // get unit of time ('ms', 's', 'm', 'h', 'd', 'y', etc.)
    let unitOfTime = expiresIn.substring(lastIndexOfDigit);    
    // console.log(unitOfTime);

    switch(unitOfTime) {
        case 'ms':
        case 'MS':
            return (parseInt(duration) / 1000).toString();

        case 's':
        case 'S':
            return duration;
        
        case 'm':
        case 'M':
            return (parseInt(duration) * 60).toString();
        
        case 'h':
        case 'H':
            return (parseInt(duration) * 60 * 60).toString();
        
        case 'd':
        case 'D':
            return (parseInt(duration) * 24 * 60 * 60).toString();
        
        case 'y':
        case 'Y':
            // consider each year to be of 365 days
            return (parseInt(duration) * 365 * 24 * 60 * 60).toString();        
    }

}

module.exports = { JWTExpiresInStringToSeconds };