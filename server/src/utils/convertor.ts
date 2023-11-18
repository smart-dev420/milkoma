function stringToBoolean(value: string): boolean {
  if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  } else {
    throw new Error(`Invalid boolean value: ${value}`);
  }
}
export default stringToBoolean;
