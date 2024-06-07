const shouldForwardProp = (prop) => !prop.startsWith('$');

export default shouldForwardProp;