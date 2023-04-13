const checkLinkDisableStatus = fields => {
    // Names of all the fields
    const fieldNames = Object.keys(fields);

    // Evaluates if all fields are filled out or not
    return fieldNames.every(name => fields[name] === "");
}

export default checkLinkDisableStatus;