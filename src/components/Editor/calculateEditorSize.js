const calculateEditorSize = ({ windowHeight, windowWidth }) => {
  // Based on the iPhone Pro to fit on mobile
  if (windowHeight < 400 || windowWidth < 400) {
    return {
      width: windowWidth,
      height: (windowHeight / 100) * 70,
    };
  }
  // Avoid to a to big editor on width
  if (windowWidth > 1080) {
    return {
      width: 1080,
      height: (windowHeight / 100) * 80,
    };
  }
  return {
    width: (windowWidth / 100) * 80,
    height: (windowHeight / 100) * 80,
  };
};

export default calculateEditorSize;
